import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Digite seu nome ou e-mail"),
  password: z.string().nonempty("Digite sua senha"),
});

export type LoginInput = z.infer<typeof loginSchema>;
