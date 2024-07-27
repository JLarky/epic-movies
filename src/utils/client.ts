const apiHost = import.meta.env.PUBLIC_API_HOST;

const headers = {
	Authorization: 'Bearer ' + import.meta.env.PUBLIC_KEY,
};

export type Rating = 'G' | ' PG' | '14A' | '18A' | 'R';
export type Movie = { id: string; title: string; posterUrl: string; rating: Rating };

export async function apiCall<T>(path: string): Promise<T> {
	const res = await fetch(`${apiHost}${path}`, { headers });
	if (!res.ok) {
		throw new Error('Network response was not ok ' + res.statusText);
	}
	const movies = await res.json();
	return movies as T;
}

export function listMovies({ search }: { search?: string } = {}) {
	const query = search ? '?' + new URLSearchParams({ search }) : '';
	return apiCall<{
		data: Movie[];
		totalPages: number;
	}>('/movies' + query);
}
