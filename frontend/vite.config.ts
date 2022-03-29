import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { join } from 'desm';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
		},
	},
	plugins: [vue(), svgLoader(), WindiCSS()],
});
