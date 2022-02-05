export type DavinciCompositionConfig = {
	name: string;
	metadata: {
		[x: string]: unknown;
		width: number;
		height: number;
	};
};

export type DavinciConfig = {
	projectName: string;
	fusionCompositions: DavinciCompositionConfig[];
};

export type DavinciComposition = DavinciCompositionConfig & {
	compFilePath: string;
	renderPath: string;
};
