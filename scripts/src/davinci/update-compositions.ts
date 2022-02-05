import {
	getChangedCompositions,
	convertCompositions,
	renderCompositions,
	startFusionServer,
} from '../utils/davinci/index.js';

await startFusionServer();

const updatedCompositions = await getChangedCompositions();
const renderedCompositions = await renderCompositions(updatedCompositions);
await convertCompositions(renderedCompositions);
