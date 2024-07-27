import { getMovieDetails, listMovies, type MovieDetails } from './client';

export type MovieWithDetails = {
	id: string;
	details: MovieDetails;
};

export async function movieSearch({ search }: { search?: string } = {}) {
	const movies = await listMovies({ search });
	const ids = movies.data.map((movie) => movie.id);
	const promises = ids.map((id) => getMovieDetails({ id }));
	const data = await Promise.all(promises);
	return { data: data, totalPages: movies.totalPages };
}
