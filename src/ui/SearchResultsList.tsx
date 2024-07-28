import { useQuery } from '@tanstack/react-query';
import style from './LoadingIndicator.module.css';
import { MovieList } from './MovieList';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { genreAtom } from './searchAtom';

export function SearchResultsList({ search }: { search: string }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	const genre = useAtomValue(genreAtom);
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		setCurrentPage(1); // reset pagination when search changes
	}, [search, genre]);
	const query = useQuery({
		placeholderData: (previousData, _previousQuery) => previousData, // `keepPreviousData`
		// search api doesn't do anything when you search for just one character
		queryKey: ['search', search.length > 1 ? search : '', currentPage, genre],
		queryFn: async () => {
			return actions.searchMovies({ search, page: currentPage, genre });
		},
		staleTime: Infinity,
	});
	console.log('SearchResultsList', query.isFetching, query);
	// console.log('SearchResultsList', query.isFetching, initialData, query.data);
	return (
		<div style={{ marginTop: 8 }}>
			{mounted && <LoadingIndicator isLoading={query.isFetching} />}
			<div style={{ marginBottom: 8 }}>
				Search results for "{search}" ({query.data?.totalResults || 0} results)
			</div>
			<Pager
				currentPage={currentPage}
				totalPages={query.data?.totalPages || 0}
				onNext={() => setCurrentPage((x) => x + 1)}
				onPrev={() => setCurrentPage((x) => x - 1)}
			>
				<MovieList movies={query.data?.data || []} />
			</Pager>
		</div>
	);
}

function Pager({
	currentPage,
	onPrev,
	onNext,
	totalPages,
	children,
}: {
	currentPage: number;
	onPrev: () => void;
	onNext: () => void;
	totalPages: number;
	children: React.ReactNode;
}) {
	return (
		<>
			<div style={{ display: 'flex', gap: 10 }}>
				<button onClick={onPrev} disabled={currentPage === 1} style={{ flex: '0 0 50px' }}>
					Prev
				</button>
				<div style={{ flex: 1 }}>{children}</div>
				<button onClick={onNext} disabled={currentPage >= totalPages} style={{ flex: '0 0 50px' }}>
					Next
				</button>
			</div>
			<div>
				Page {currentPage} out of {totalPages}
			</div>
		</>
	);
}

function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
	console.log('LoadingIndicator', isLoading);
	return (
		<div className={style.indicator}>
			<div className={style.spinner} hidden={!isLoading} />
		</div>
	);
}
