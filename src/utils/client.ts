const apiHost = import.meta.env.PUBLIC_API_HOST;

const headers = {
	Authorization: 'Bearer ' + import.meta.env.PUBLIC_KEY,
};

export type Rating = 'G' | ' PG' | '14A' | '18A' | 'R';
export type Genre = { id: string; title: string };
export type Movie = { id: string; title: string; posterUrl: string; rating: Rating };
export type MovieDetails = {
	id: string;
	title: string;
	posterUrl: string;
	rating: Rating;
	summary: string;
	duration: string;
	directors: string[];
	mainActors: string[];
	datePublished: string;
	ratingValue: number;
	bestRating: number;
	worstRating: number;
	writers: string[];
	genres: Genre[];
};

const apiCallCache = new Map<string, unknown>();

export async function apiCall<T>(path: string): Promise<T> {
	// TODO: dont' pass <T> pass valibot maybe?
	const cached = apiCallCache.get(path) as T | undefined;
	if (cached) {
		return cached;
	}
	const res = await fetch(`${apiHost}${path}`, { headers });
	if (!res.ok) {
		throw new Error('Network response was not ok ' + res.statusText);
	}
	const data = await res.json();
	apiCallCache.set(path, data);
	return data as T;
}

export function listMovies({
	search,
	page,
	genre,
}: { search?: string; page?: number; genre?: string } = {}) {
	const params = new URLSearchParams({ page: String(page || 1) });
	if (search) {
		params.set('search', search);
	}
	if (genre) {
		params.set('genre', genre);
	}
	return apiCall<{
		data: Movie[];
		totalPages: number;
	}>('/movies' + '?' + params);
}

export function getMovieDetails({ id }: { id: string }) {
	return apiCall<MovieDetails>(`/movies/${encodeURIComponent(id)}`);
}

export function listGenres() {
	return apiCall<{ data: Genre[]; totalPages: number }>('/genres/movies');
}
