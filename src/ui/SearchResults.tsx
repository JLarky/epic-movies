import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { searchDebouncedAtom } from './searchAtom';
import { SearchResultsList } from './SearchResultsList';
import { QueryProvider } from './QueryProvider';

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

export function SearchResults() {
	const debouncedText = useAtomValue(searchDebouncedAtom);
	return (
		<QueryProvider>
			<SearchResultsList search={debouncedText} />
		</QueryProvider>
	);
}
