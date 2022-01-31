import { getOctokit } from '../github.js';
import type { GithubData, GitHubTreeItem } from '~/types/github.js';

export async function getGithubData(): Promise<GithubData> {
	const octokit = getOctokit();
	const githubData = {} as GithubData;
	console.log(
		await octokit.rest.activity.listPublicEventsForUser({
			username: 'leonzalion',
		})
	);

	return githubData;
}
