import { useAtomValue, useSetAtom } from 'jotai';
import { searchAtom, searchDebouncedAtom } from './searchAtom';
import { useEffect, useState } from 'react';

export function Search() {
	const setText = useSetAtom(searchAtom);
	return (
		<>
			<input type="text" placeholder="Search" onChange={(e) => setText(e.target.value)} />
			<UpdateDebounce />
		</>
	);
}

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

function UpdateDebounce() {
	const setDebouncedText = useSetAtom(searchDebouncedAtom);
	const text = useAtomValue(searchAtom);
	const debouncedText = useDebounceValue(text, 300);
	useEffect(() => {
		setDebouncedText(debouncedText);
	}, [debouncedText]);
	return null;
}
