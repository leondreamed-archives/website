export type DavinciComposition = {
	name: string;
	metadata: {
		[x: string]: unknown;
		width: number;
		height: number;
	};
};

export type DavinciConfig = {
	projectName: string;
	fusionCompositions: DavinciComposition[];
};
