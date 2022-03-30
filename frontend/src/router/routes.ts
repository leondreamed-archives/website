import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/discord',
		component: async () => import('~/pages/discord-page.vue'),
	},
	{
		path: '/',
		component: async () => import('~/pages/basic-landing-page.vue'),
	},
	{
		path: '/experimental',
		component: async () => import('~/pages/landing-page.vue'),
	},
	{
		path: '/test',
		component: async () => import('~/pages/test-page.vue'),
	},
];
