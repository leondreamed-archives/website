/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import { Buffer } from 'node:buffer';
import dayjs from 'dayjs';
import onetime from 'onetime';
import { Octokit } from 'octokit';
import yaml from 'js-yaml';
import type { RescuetimeData } from '~/types/rescuetime';
import type { GithubData, GitHubTreeItem } from '~/types/github';
import type { WakatimeData } from '~/types/wakatime';

export const getOctokit = onetime(
	() =>
		new Octokit({
			auth: process.env.GITHUB_ACCESS_TOKEN,
		})
);

type UpdateGithubRepoProps = {
	rescuetimeData: RescuetimeData;
	githubData: GithubData;
	wakatimeData: WakatimeData;
};

export async function updateGithubRepo({
	githubData,
	rescuetimeData,
	wakatimeData,
}: UpdateGithubRepoProps): Promise<string> {
	const octokit = getOctokit();

	const owner = 'leonzalion';
	const repo = 'website';
	const branchToUpdate = 'main';

	console.info('Retrieving the current branch ref...');
	const getRefResponse = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branchToUpdate}`,
	});
	const baseTree = getRefResponse.data.object.sha;

	const treeItems: GitHubTreeItem[] = [];

	const githubYamlBlobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: Buffer.from(yaml.dump(githubData)).toString('base64'),
		encoding: 'base64'
	});

	treeItems.push({
		path: 'data/github.yaml',
		type: 'blob',
		sha: githubYamlBlobResponse.data.sha,
		mode: '100644',
	});

	const rescuetimeYamlBlobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: Buffer.from(yaml.dump(rescuetimeData)).toString('base64'),
		encoding: 'base64'
	});

	treeItems.push({
		path: 'data/rescuetime.yaml',
		type: 'blob',
		sha: rescuetimeYamlBlobResponse.data.sha,
		mode: '100644',
	});

	const wakatimeYamlBlobResponse = await octokit.rest.git.createBlob({
		owner,
		repo,
		content: Buffer.from(yaml.dump(wakatimeData)).toString('base64'),
		encoding: 'base64'
	});

	treeItems.push({
		path: 'data/wakatime.yaml',
		type: 'blob',
		sha: wakatimeYamlBlobResponse.data.sha,
		mode: '100644',
	});

	console.info('Creating the tree...');
	const createTreeResponse = await octokit.rest.git.createTree({
		owner,
		repo,
		tree: treeItems,
		base_tree: baseTree,
	});

	console.info('Creating the commit...');
	const commitResponse = await octokit.rest.git.createCommit({
		message: `Update stats on ${dayjs
			.tz(new Date())
			.format('YYYY-MM-DD h:mm A')}`,
		owner,
		repo,
		tree: createTreeResponse.data.sha,
		parents: [baseTree],
	});

	console.info('Updating the ref...');
	await octokit.rest.git.updateRef({
		owner,
		repo,
		force: true,
		ref: `heads/${branchToUpdate}`,
		sha: commitResponse.data.sha,
	});

	return commitResponse.data.sha;
}
