export type DavinciComposition = {
	name: string;
	metadata: Record<string, unknown>;
};

export type DavinciConfig = {
	projectName: string;
	fusionCompositions: DavinciComposition[];
};
