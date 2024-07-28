import deno from '@astrojs/deno';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	adapter: deno(),
	output: 'hybrid', // or 'server'
	experimental: {
		actions: true,
	},
});
