// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'http://localhost:1111',
	integrations: [mdx(), sitemap(), react(), tailwind()],
	build: {
		assets: 'assets'
	}
});
