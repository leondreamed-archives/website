import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/communication',
		component: async () => import('~/pages/communication-page.vue'),
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
	{
		path: '/:catchAll(.*)',
		component: async () => import('~/pages/404-page.vue'),
	},
];
