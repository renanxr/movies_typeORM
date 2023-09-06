import { z } from "zod";

const movieSchema = z.object({
	id: z.number().positive(),
	name: z.string().max(50).nonempty(),
	description: z.string().nullish().optional(),
	duration: z.number().positive(),
	price: z.number().int(),
});

const movieSchemaCreate = movieSchema.omit({ id: true });
const movieSchemaUpdate = movieSchema.partial();

export { movieSchema, movieSchemaCreate, movieSchemaUpdate };
