export type GitHubTreeItem = {
	path?: string;
	mode?: '100644' | '100755' | '040000' | '160000' | '120000';
	type?: 'blob' | 'tree' | 'commit';
	sha?: string | null;
	content?: string;
};

export type GithubData = {
	monke: string
}