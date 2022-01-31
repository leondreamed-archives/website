import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { join } from 'desm';

export default defineConfig({
	base: '/website/',
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
		},
	},
	plugins: [vue(), svgLoader()],
});
