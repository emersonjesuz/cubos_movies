import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' é obrigatório."),
    email: z.string().nonempty("O campo 'email' é obrigatório.").email("O email informado é inválido."),
    password: z.string().nonempty("O campo 'senha' é obrigatório.").min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .nonempty("O campo 'confirme a senha' é obrigatório.")
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
