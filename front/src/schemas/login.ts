import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Digite seu nome ou e-mail").email("E-mail inválido"),
  password: z.string().nonempty("Digite sua senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;
