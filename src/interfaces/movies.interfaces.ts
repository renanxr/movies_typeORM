import { z } from "zod";
import { movieSchema, movieSchemaCreate } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";
import { Movie } from "../entities";

type Imovie = z.infer<typeof movieSchema>;
type movieCreate = z.infer<typeof movieSchemaCreate>;
type movieUpdate = DeepPartial<movieCreate>;
type movieRead = Array<Movie>;

export { Imovie, movieCreate, movieUpdate, movieRead };
