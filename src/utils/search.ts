import NodeCache from 'node-cache';
import { getMovieDetails, listMovies, type MovieDetails } from './client';

export type MovieWithDetails = {
	id: string;
	details: MovieDetails;
};

const LIMIT = 25;

export async function movieSearch({ search, page }: { search?: string; page?: number } = {}) {
	const movies = await listMovies({ search, page });
	const totalPages = movies.totalPages;
	let totalResults = movies.data.length;
	if (totalPages > 1) {
		totalResults = await getTotalResults(search ?? '', totalPages);
	}
	const ids = movies.data.map((movie) => movie.id);
	const promises = ids.map((id) => getMovieDetails({ id }));
	const data = await Promise.all(promises);
	return { data: data, totalPages: movies.totalPages, totalResults };
}

const totalResultsCache = new NodeCache();

/**
 * call this if you have more than one page of results
 */
async function getTotalResults(search: string, totalPages: number) {
	const key = `${search}-${totalPages}`;
	const cached = totalResultsCache.get<number>(key);
	if (cached) {
		return cached;
	}
	if (totalPages < 2) {
		throw new Error('totalPages must be greater than 1');
	}
	let totalResults = LIMIT * (totalPages - 1); // the amout of full pages
	const lastPage = await listMovies({ search, page: totalPages });
	totalResults += lastPage.data.length;
	totalResultsCache.set(key, totalResults);
	return totalResults;
}
