import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const verifyNameExists = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
	const bodyName: string | undefined = req.body.name;
	if (bodyName) {
		const movie: Movie | null = await movieRepository.findOne({
			where: { name: bodyName },
		});
		if (movie) {
			throw new AppError("Movie already exists.", 409);
		}
	}

	next();
};

export default verifyNameExists;
