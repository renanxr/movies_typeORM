import { Request, Response } from "express";
import {
	Imovie,
	movieCreate,
	movieUpdate,
} from "../interfaces/movies.interfaces";
import {
	createMovies,
	deleteMovie,
	readMovies,
	updateMovie,
} from "../services/movies.service";
import { moviePagination } from "../interfaces/pagination.interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
	const movieData: movieCreate = req.body;
	const newMovie: Imovie = await createMovies(movieData);
	return res.status(201).json(newMovie);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const id: number = parseInt(req.params.id);
	const movieData: movieUpdate = req.body;
	const updatedMovie: Imovie = await updateMovie(movieData, id);
	return res.status(200).json(updatedMovie);
};

const read = async (req: Request, res: Response): Promise<Response> => {
	const queryPage: number = Number(req.query.page);
	const queryPerPage: number = Number(req.query.perPage);
	const querySort: string = String(req.query.sort);
	const queryOrder: string = String(req.query.order);

	const page: number = queryPage && queryPage > 0 ? queryPage : 1;
	const perPage: number =
		queryPerPage && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;
	const sort: string = ["price", "duration"].includes(querySort)
		? querySort
		: "id";
	const order: string = ["asc", "desc"].includes(queryOrder)
		? queryOrder
		: "asc";

	const pagination = await readMovies(page, perPage, sort, order);

	return res.status(200).json(pagination);
};

const destroy = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const id: number = parseInt(req.params.id);
	await deleteMovie(id);
	return res.status(204).send();
};

export { create, update, read, destroy };
