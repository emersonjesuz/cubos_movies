import { PrismaService } from "../shared/services/prisma/PrismaService";
import { UserEntity } from "./UserEntity";
import { UserMapper } from "./UserMapper";

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

export class UserPrismaRepository implements UserRepository {
  private prisma = PrismaService;
  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.getEmail(),
        name: user.getName(),
        password: user.getPassword(),
      },
    });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return UserMapper.toUserEntity(user);
  }
}
