import { getOctokit } from '../github.js';
import type { GithubData } from '~/types/github.js';

export async function getGithubData(): Promise<GithubData> {
	const octokit = getOctokit();

	const githubData = {
		events: [],
	} as GithubData;

	console.info('Retrieving GitHub activity data...');

	const events = await octokit.rest.activity.listPublicEventsForUser({
		username: 'leonzalion',
	});

	for (const eventData of events.data) {
		// Skipping automated events
		if (
			(
				eventData.payload as { commits?: Array<{ message: string }> }
			).commits?.[0]?.message.startsWith('[automated]')
		) {
			continue;
		}

		githubData.events.push({
			date: eventData.created_at!,
			type: eventData.type!,
		});

		if (eventData.type === 'PushEvent') {
			const commit = (
				eventData.payload as {
					commits: Array<{ message: string; url: string }>;
				}
			).commits[0]!;

			githubData.latestCommit = {
				message: commit.message,
				url: commit.url,
				repo: {
					url: eventData.repo.url,
					name: eventData.repo.name,
				},
			};
		}
	}

	return githubData;
}
