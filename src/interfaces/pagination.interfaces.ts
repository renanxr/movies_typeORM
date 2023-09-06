import { movieRead } from "./movies.interfaces";

type moviePagination = {
	prevPage: string | null;
	nextPage: string | null;
	count: number;
	data: movieRead;
};

export { moviePagination };
