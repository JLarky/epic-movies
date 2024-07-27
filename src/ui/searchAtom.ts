import { atom } from 'jotai';

const initialValue = '';

export const searchAtom = atom(initialValue);

export const searchDebouncedAtom = atom(initialValue);

export const genreAtom = atom(undefined as undefined | string);
