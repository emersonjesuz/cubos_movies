import { PasswordEncoder } from "../shared/security/PasswordEncoder";
import { UserEntity } from "../users/UserEntity";
import { UserRepository } from "../users/UserRepository";
import { RegisterInput } from "./dtos/RegisterInput";
import { UserAlreadyExistsException } from "./exceptions/UserAlreadyExistsException";

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly passwordEncoder: PasswordEncoder) {}

  public async register(input: RegisterInput): Promise<void> {
    const hasUser = await this.userRepository.findByEmail(input.getEmail());
    if (hasUser) throw new UserAlreadyExistsException();
    const passwordHash = await this.passwordEncoder.encode(input.getPassword());
    const newUser = new UserEntity(input.getName(), input.getEmail(), passwordHash);
    await this.userRepository.save(newUser);
  }
}
