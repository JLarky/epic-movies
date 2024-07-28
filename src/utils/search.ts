import { getMovieDetails, listMovies, type MovieDetails } from './client';

export type MovieWithDetails = {
	id: string;
	details: MovieDetails;
};

const LIMIT = 25;

export type MovieSearchResults = Awaited<ReturnType<typeof movieSearch>>;

export async function movieSearch({
	search,
	page,
	genre,
}: {
	search?: string;
	page?: number;
	genre?: string;
} = {}) {
	const movies = await listMovies({ search, page, genre });
	const totalPages = movies.totalPages;
	let totalResults = movies.data.length;
	if (totalPages > 1) {
		totalResults = await getTotalResults(search ?? '', genre ?? '', totalPages);
	}
	const ids = movies.data.map((movie) => movie.id);
	const promises = ids.map((id) => getMovieDetails({ id }));
	const data = await Promise.all(promises);
	return { data: data, totalPages: movies.totalPages, totalResults };
}

const totalResultsCache = new Map<string, number>();

/**
 * call this if you have more than one page of results
 */
async function getTotalResults(search: string, genre: string, totalPages: number) {
	const key = `${search}-${totalPages}-${genre}`;
	const cached = totalResultsCache.get(key);
	if (cached) {
		return cached;
	}
	if (totalPages < 2) {
		throw new Error('totalPages must be greater than 1');
	}
	let totalResults = LIMIT * (totalPages - 1); // the amout of full pages
	const lastPage = await listMovies({ search, page: totalPages, genre });
	totalResults += lastPage.data.length;
	totalResultsCache.set(key, totalResults);
	return totalResults;
}
