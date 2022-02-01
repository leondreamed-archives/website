export type GitHubTreeItem = {
	path?: string;
	mode?: '100644' | '100755' | '040000' | '160000' | '120000';
	type?: 'blob' | 'tree' | 'commit';
	sha?: string | null;
	content?: string;
};

export type GithubEvent = {
	type: string;
	date: string;
};

export type GithubCommit = {
	repo: {
		name: string;
		url: string;
	};
	message: string;
	url: string;
};

export type GithubData = {
	/**
	 * GitHub events in the current day
	 */
	events: GithubEvent[];
	latestCommit?: GithubCommit;
};
