import { defineAction, z } from 'astro:actions';
import { movieSearch } from '../utils/search';

export const server = {
	searchMovies: defineAction({
		accept: 'json',
		input: z.object({
			search: z.string(),
			page: z.number(),
		}),
		handler: async ({ search, page }) => {
			return movieSearch({ search, page });
		},
	}),
};
