import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { searchDebouncedAtom } from './searchAtom';

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

export function SearchResults({ children }: { children?: React.ReactNode }) {
	const debouncedText = useAtomValue(searchDebouncedAtom);
	if (!debouncedText) {
		return <>{children}</>;
	}
	return <>{debouncedText}</>;
}
