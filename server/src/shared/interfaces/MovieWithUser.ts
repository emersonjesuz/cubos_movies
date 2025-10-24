import { Prisma } from "@prisma/client";

export type MovieWithUser = Prisma.MoviesGetPayload<{
  include: { users: true };
}>;
