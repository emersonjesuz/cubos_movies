import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ error: "MESSAGE: The field 'name' is obligatory.  CODE: NAME_IS_OBLIGATORY" })
    .nonempty({ error: "MESSAGE: The field 'name' is obligatory.  CODE: NAME_IS_OBLIGATORY" }),
  email: z
    .string({ error: "MESSAGE: The field 'email' is obligatory.  CODE: EMAIL_IS_OBLIGATORY" })
    .email({ error: "MESSAGE: The field 'email' is invalid.  CODE: EMAIL_IS_INVALID" }),
  password: z
    .string({ error: "MESSAGE: The field 'password' is obligatory.  CODE: PASSWORD_IS_OBLIGATORY" })
    .min(6, { error: "MESSAGE: The field 'password' must be at least 6 characters long.  CODE: PASSWORD_IS_INVALID" }),
});

export const loginSchema = z.object({
  email: z.string({ error: "MESSAGE: The field 'email' is obligatory.  CODE: EMAIL_IS_OBLIGATORY" }),
  password: z.string({ error: "MESSAGE: The field 'password' is obligatory.  CODE: PASSWORD_IS_OBLIGATORY" }),
});
