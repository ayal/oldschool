// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://ayal.github.io/oldschool',
	base: 'oldschool',
	integrations: [mdx(), sitemap()],
	build: {
		assets: 'assets'
	}
});
