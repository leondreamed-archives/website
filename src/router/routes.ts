import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: async () => import('~/pages/landing-page.vue'),
	},
	{
		path: '/test',
		component: async () => import('~/pages/test-page.vue'),
	},
];
