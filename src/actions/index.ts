import { defineAction, z } from 'astro:actions';
import { movieSearch } from '../utils/search';

export const server = {
	searchMovies: defineAction({
		accept: 'json',
		input: z.object({
			search: z.string(),
			page: z.number(),
			genre: z.string().optional(),
		}),
		handler: async ({ search, page, genre }) => {
			return movieSearch({ search, page, genre });
		},
	}),
};
