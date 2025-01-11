// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://ayal.github.io/oldschool',
	base: 'oldschool',
	integrations: [mdx(), sitemap(), react()],
	build: {
		assets: 'assets'
	}
});
