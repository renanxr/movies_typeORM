import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";


const verifyMovieExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
	const id: number = parseInt(req.params.id);

	const existingMovie = await movieRepository.findOneBy({id: id});

	if (!existingMovie) {
		throw new AppError("Movie not found", 404);
	}

	next();
};

export default verifyMovieExists;