import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { searchDebouncedAtom } from './searchAtom';
import { SearchResultsList } from './SearchResultsList';
import { QueryProvider } from './QueryProvider';
import { dehydrate } from '@tanstack/react-query';

export function useDebounceValue<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}

export function SearchResults({ serverOnlyProps, ...props }: { serverOnlyProps: () => unknown }) {
	console.log('SearchResults', serverOnlyProps());
	const debouncedText = useAtomValue(searchDebouncedAtom);
	return (
		// <QueryProvider
		// 	dehydratedState={dehydrate(serverOnlyProps(), {
		// 		shouldDehydrateQuery: ({ options }) => {
		// 			console.log('shouldDehydrateQuery', options);
		// 			return true;
		// 		},
		// 	})}
		// >
		<SearchResultsList search={debouncedText} {...props} />
		// </QueryProvider>
	);
}
