import { Repository } from "typeorm";
import { Movie } from "../entities";
import {
	Imovie,
	movieCreate,
	movieRead,
	movieUpdate,
} from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { movieSchema, movieSchemaUpdate } from "../schemas/movies.schemas";
import { moviePagination } from "../interfaces/pagination.interfaces";

const createMovies = async (movieData: movieCreate): Promise<Imovie> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
	const movie: Movie = movieRepository.create(movieData);
	await movieRepository.save(movie);
	const newMovie: Imovie = movie;

	return newMovie;
};

const updateMovie = async (
	movieData: movieUpdate,
	id: number
): Promise<Imovie> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

	const existingMovie: Movie | null = await movieRepository.findOneBy({
		id: id,
	});

	const updatedMovieData: Movie = movieRepository.create({
		...existingMovie,
		...movieData,
	});

	await movieRepository.save(updatedMovieData);

	const returnMovie: Imovie = movieSchema.parse(updatedMovieData);

	return returnMovie;
};

const readMovies = async (
	page: number,
	perPage: number,
	sort: string,
	order: string
): Promise<moviePagination> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

	const totalCount: number = await movieRepository.count();
	let movies: movieRead;

	if (!sort) {
		movies = await movieRepository.find({
			skip: (page - 1) * perPage,
			take: perPage,
			order: {
				id: order.toUpperCase() as "ASC",
			},
		});
	} else {
		movies = await movieRepository.find({
			skip: (page - 1) * perPage,
			take: perPage,
			order: {
				[sort]: order.toUpperCase() as "ASC" | "DESC",
			},
		});
	}

	const baseUrl: string = "http://localhost:3000/movies";
	const prevPage: string | null =
		page > 1 ? `${baseUrl}?page=${page - 1}&perPage=${perPage}` : null;
	const nextPage: string | null =
		totalCount > perPage * page
			? `${baseUrl}?page=${page + 1}&perPage=${perPage}`
			: null;

	const pagination: moviePagination = {
		prevPage,
		nextPage,
		count: totalCount,
		data: movies,
	};

	return pagination;
};

const deleteMovie = async (id: number): Promise<Movie> => {
	const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
	const movie = await movieRepository.findOneOrFail({
		where: { id },
	});
	await movieRepository.remove(movie);

	return movie;
};

export { createMovies, updateMovie, readMovies, deleteMovie };
