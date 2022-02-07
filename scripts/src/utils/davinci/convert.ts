import path from 'node:path';
import fs from 'node:fs';
import { execa } from 'execa';
import { Listr } from 'listr2';
import pathToFfmpeg from 'ffmpeg-static';
import type { DavinciComposition } from '../../types/davinci.js';
import { getHevcVideoPath, getWebmVideoPath } from './composition.js';

export async function convertCompositions(compositions: DavinciComposition[]) {
	const avConvert = '/usr/bin/avconvert';

	const tasks = new Listr([], { concurrent: true });

	const videoWidth = 1920;
	const videoHeight = 1080;

	for (const composition of compositions) {
		tasks.add({
			async task(ctx, task) {
				task.title = `Cropping ${composition.name}.mov`;

				const cropWidth = composition.metadata.width;
				const cropHeight = composition.metadata.height;
				const cropX = (videoWidth - cropWidth) / 2;
				const cropY = (videoHeight - cropHeight) / 2;

				const croppedVideoPath = path.join(
					path.dirname(composition.renderPath),
					`${composition.name}.cropped.mov`
				);

				await fs.promises.rm(croppedVideoPath, { force: true });

				await execa(pathToFfmpeg, [
					'-i',
					composition.renderPath,
					'-filter:v',
					`crop=${cropWidth}:${cropHeight}:${cropX}:${cropY}`,
					'-c:v',
					'prores_ks',
					'-profile:v',
					'4',
					'-vendor',
					'apl0',
					'-pix_fmt',
					'yuva444p10le',
					croppedVideoPath,
				]);

				task.title = `Converting ${composition.name}.mov`;
				// HEVC
				const hevcPath = getHevcVideoPath(composition);
				await fs.promises.rm(hevcPath, { recursive: true, force: true });

				await execa(avConvert, [
					'-prog',
					'--preset',
					'PresetHEVC1920x1080WithAlpha',
					'--source',
					croppedVideoPath,
					'--output',
					hevcPath,
				]);

				// WebM
				const webmPath = getWebmVideoPath(composition);
				await fs.promises.rm(webmPath, { recursive: true, force: true });
				await execa(pathToFfmpeg, [
					'-i',
					croppedVideoPath,
					'-stats_period',
					'0.1',
					'-c:v',
					'libvpx-vp9',
					'-progress',
					'pipe:1',
					'-nostdin',
					webmPath,
				]);

				await fs.promises.rm(croppedVideoPath, { force: true });
			},
		});
	}

	await tasks.run();
}
