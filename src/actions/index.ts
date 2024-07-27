import { defineAction, z } from 'astro:actions';
import { movieSearch } from '../utils/search';

export const server = {
	searchMovies: defineAction({
		accept: 'json',
		input: z.object({
			search: z.string(),
		}),
		handler: async ({ search }) => {
			return movieSearch({ search });
		},
	}),
};