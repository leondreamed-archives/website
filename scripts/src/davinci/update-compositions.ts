import {
	getChangedCompositions,
	convertCompositions,
	renderCompositions,
	startFusionServer,
} from '../utils/davinci/index.js';

await startFusionServer();

const compositionsToRender = await getChangedCompositions();

await renderCompositions(compositionsToRender);

await convertCompositions(compositionsToRender);
