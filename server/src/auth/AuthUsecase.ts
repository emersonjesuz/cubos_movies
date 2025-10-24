import { PasswordEncoder } from "../shared/security/PasswordEncoder";
import { TokenService } from "../shared/security/TokenService";
import { UserEntity } from "../users/UserEntity";
import { UserRepository } from "../users/UserRepository";
import { LoginInput } from "./dtos/LoginInput";
import { RegisterInput } from "./dtos/RegisterInput";
import { EmailOrPasswordIncorrectException } from "./exceptions/EmailOrPasswordIncorrectException";
import { UserAlreadyExistsException } from "./exceptions/UserAlreadyExistsException";

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly tokenService: TokenService
  ) {}

  public async register(input: RegisterInput): Promise<void> {
    const hasUser = await this.userRepository.findByEmail(input.email);
    if (hasUser) throw new UserAlreadyExistsException();
    const passwordHash = await this.passwordEncoder.encode(input.password);
    const newUser = new UserEntity(input.name, input.email, passwordHash);
    await this.userRepository.save(newUser);
  }
  public async login(input: LoginInput): Promise<string> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new EmailOrPasswordIncorrectException();
    const passwordIsMatches = await this.passwordEncoder.matches(input.password, user.getPassword());
    if (!passwordIsMatches) throw new EmailOrPasswordIncorrectException();
    return this.tokenService.generated({ id: user.getId() });
  }
}
