import { UserEntity } from "../../../users/UserEntity";
import { UserMapper } from "../../../users/UserMapper";
import { UserRepository } from "../../../users/UserRepository";
import { PrismaService } from "../../services/prisma/PrismaService";

export class UserPrismaRepository implements UserRepository {
  private prisma = PrismaService;
  async save(user: UserEntity): Promise<void> {
    await this.prisma.users.create({
      data: {
        email: user.getEmail(),
        name: user.getName(),
        password: user.getPassword(),
      },
    });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) return null;
    return UserMapper.toUserEntity(user);
  }
}
