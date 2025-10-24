import { Users } from "@prisma/client";
import { UserEntity } from "./UserEntity";

export class UserMapper {
  public static toUserEntity(userDb: Users): UserEntity {
    return new UserEntity(userDb.id, userDb.name, userDb.email, userDb.password);
  }
}
