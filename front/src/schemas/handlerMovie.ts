import { z } from "zod";

export const movieSchema = z.object({
  title: z.string({ error: "O título é obrigatório." }).min(1, { message: "O título não pode estar vazio." }),

  originalTitle: z
    .string({ error: "O título original é obrigatório." })
    .min(1, { message: "O título original não pode estar vazio." }),

  synopsis: z.string({ error: "A sinopse é obrigatória." }).min(1, { message: "A sinopse não pode estar vazia." }),

  description: z.string({ error: "A descrição é obrigatória." }).min(1, { message: "A descrição não pode estar vazia." }),

  popularity: z
    .string({ error: "A popularidade é obrigatória." })
    .min(1, { message: "A popularidade não pode estar vazia." })
    .regex(/^\d+$/, { message: "A popularidade deve conter apenas números." })
    .refine(
      (val) => {
        const num = Number(val);
        return num >= 1 && num <= 100;
      },
      { message: "A popularidade deve estar entre 1 e 100." }
    ),

  release: z.coerce.date({ error: "A data de lançamento deve ser válida." }),

  budget: z.coerce.number({ error: "O orçamento é obrigatório." }).nonnegative({ message: "O orçamento não pode ser negativo." }),

  revenue: z.coerce.number({ error: "A receita é obrigatória." }).nonnegative({ message: "A receita não pode ser negativa." }),

  votes: z.coerce
    .number({ error: "A quantidade de votos é obrigatória." })
    .int({ message: "Os votos devem ser um número inteiro." })
    .nonnegative({ message: "Os votos não podem ser negativos." }),

  duration: z
    .string({ error: "A duração é obrigatória." })
    .min(1, { message: "A duração não pode estar vazia." })
    .regex(/^\d+$/, { message: "A duração deve ser informada em minutos (somente números)." }),

  language: z.string({ error: "O idioma é obrigatório." }).min(1, { message: "O idioma não pode estar vazio." }),

  profit: z.coerce.number({ error: "O lucro deve ser um número." }),

  status: z.string({ error: "O status é obrigatório." }).min(1, { message: "O status não pode estar vazio." }),

  urlCover: z.string({ error: "A capa é obrigatória." }).url({ message: "Informe uma URL válida para a capa." }),

  urlBackground: z
    .string({ error: "O plano de fundo é obrigatória." })
    .url({ message: "Informe uma URL válida para o plano de fundo." }),

  urlTrailer: z.string({ error: "A URL do trailer é obrigatória." }).url({ message: "Informe uma URL válida para o trailer." }),

  approvalRating: z
    .string({ error: "A avaliação de aprovação é obrigatória." })
    .min(1, { message: "A avaliação de aprovação não pode estar vazia." }),

  genres: z.string({ error: "O gênero deve ser um texto." }).min(1, { message: "O nome do gênero não pode estar vazio." }),

  ageRating: z.string({ error: "A classificação indicativa é obrigatória." }),

  director: z.string({ error: "O diretor é obrigatório." }).min(1, { message: "O nome do diretor não pode estar vazio." }),
});

export type MovieSchema = z.infer<typeof movieSchema>;
