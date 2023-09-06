import { Router } from "express";
import validateBody from "../middlewares/ensureDataIsValid.middleware";
import {
	movieSchemaCreate,
	movieSchemaUpdate,
} from "../schemas/movies.schemas";
import verifyNameExists from "../middlewares/ensureNameExists.middleware";
import {
	create,
	destroy,
	read,
	update,
} from "../controllers/movies.controllers";
import verifyMovieExists from "../middlewares/ensureMovieExists.middleware";

const moviesRouter = Router();

moviesRouter.post(
	"/",
	validateBody(movieSchemaCreate),
	verifyNameExists,
	create
);

moviesRouter.patch(
	"/:id",
	validateBody(movieSchemaUpdate),
	verifyMovieExists,
	verifyNameExists,
	update
);

moviesRouter.get("/", read);

moviesRouter.delete("/:id", verifyMovieExists, destroy);

export default moviesRouter;
