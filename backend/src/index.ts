import process from 'node:process';
import fastify from 'fastify';
import * as trpc from '@trpc/server';
import { got } from 'got';
import camelcaseKeys from 'camelcase-keys';
import type { CamelcasedRescuetimeResponse } from './types/rescuetime';

const appRouter = trpc
	.router()
	.mutation('updateRescuetimeStats', {
		async resolve() {
			const response = await got.get(
				`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}`
			);

			const result = camelcaseKeys(
				JSON.parse(response.body)
			) as CamelcasedRescuetimeResponse;

			// Retrieve the top 5 most visited sites
		},
	})
	.mutation('updateWakatimeStats', {
		async resolve() {
			process.env.WAKATIME_API_KEY;
		},
	})
	.mutation('updateGithubStats', {
		async resolve() {
			process.env.GITHUB_ACCESS_TOKEN;
		},
	});

export type AppRouter = typeof appRouter;
