import fs from 'node:fs';
import path from 'node:path';
import { execa } from 'execa';
import ffmpegPath from 'ffmpeg-static';
import { Listr } from 'listr2';
import { getRootPath } from '../utils/paths.js';
import { getDavinciCompositions } from '../utils/davinci.js';

const rootPath = getRootPath();
const compositions = getDavinciCompositions();
const frontendVideosPath = path.join(rootPath, 'frontend/public/videos');

const avConvert = '/usr/bin/avconvert';

const tasks = new Listr([], { concurrent: true });

for (const composition of compositions) {
	tasks.add({
		title: `Converting ${composition.name}`,
		async task() {
			// HEVC
			const hevcPath = path.join(
				frontendVideosPath,
				`${composition.name}-hevc.mp4`
			);
			await fs.promises.rm(hevcPath, { recursive: true, force: true });

			await execa(avConvert, [
				'-prog',
				'--preset',
				'PresetHEVC1920x1080WithAlpha',
				'--source',
				composition.path,
				'--output',
				hevcPath,
			]);

			// WebM
			const webmPath = path.join(
				frontendVideosPath,
				`${composition.name}-webm.webm`
			);
			await fs.promises.rm(webmPath, { recursive: true, force: true });
			await execa(ffmpegPath, [
				'-i',
				composition.path,
				'-stats_period',
				'0.1',
				'-c:v',
				'libvpx-vp9',
				'-progress',
				'pipe:1',
				'-nostdin',
				webmPath,
			]);
		},
	});
}

await tasks.run();
