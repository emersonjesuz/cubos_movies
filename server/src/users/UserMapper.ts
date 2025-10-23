import { User } from "@prisma/client";
import { UserEntity } from "./UserEntity";

export class UserMapper {
  public static toUserEntity(userDb: User): UserEntity {
    return new UserEntity(userDb.id, userDb.name, userDb.email, userDb.password);
  }
}
