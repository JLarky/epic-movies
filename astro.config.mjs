import zeabur from '@zeabur/astro-adapter/serverless';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	adapter: zeabur(),
	output: 'hybrid', // or 'server'
	experimental: {
		actions: true,
	},
});
