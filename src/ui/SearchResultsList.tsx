import { useQuery } from '@tanstack/react-query';
import style from './LoadingIndicator.module.css';
import { MovieList } from './MovieList';
import { actions } from 'astro:actions';

export function SearchResultsList({ search }: { search: string }) {
	const query = useQuery({
		placeholderData: (previousData, _previousQuery) => previousData, // `keepPreviousData`
		// search api doesn't do anything when you search for just one character
		queryKey: ['search', search.length > 1 ? search : ''],
		queryFn: async () => {
			return actions.searchMovies({ search });
		},
	});
	return (
		<div style={{ marginTop: 8 }}>
			<LoadingIndicator isLoading={query.isFetching} />
			<div>Search results for "{search}"</div>
			<MovieList movies={query.data?.data || []} />
		</div>
	);
}

function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
	return (
		<div className={style.indicator}>
			<div className={style.spinner} hidden={!isLoading} />
		</div>
	);
}
