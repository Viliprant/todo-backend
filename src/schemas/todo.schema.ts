import * as z from 'zod';

export const createTodoSchema = z.object({
  title: z
    .string("Le titre n'est pas renseigné ou est invalide.")
    .min(1)
    .max(100),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
