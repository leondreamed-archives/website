import fs from 'node:fs';
import path from 'node:path';
import { join } from 'desm';
import { execa } from 'execa';
import ffmpegPath from 'ffmpeg-static';

const originalVideosPath = join(import.meta.url, '../public/videos/original');
const convertedVideosPath = join(import.meta.url, '../public/videos/converted');

if (!fs.existsSync(convertedVideosPath)) {
	fs.mkdirSync(convertedVideosPath, { recursive: true });
}

const avConvert = '/usr/bin/avconvert';

const originalVideoFiles = fs.readdirSync(originalVideosPath);
await Promise.all(
	originalVideoFiles
		.filter((file) => path.parse(file).ext === '.mp4')
		.map(async (videoFile) => {
			const videoPath = path.join(originalVideosPath, videoFile);
			const videoName = path.parse(videoFile).name;

			console.info(`Converting ${videoPath}...`);
			// Convert to an intermediary ProRes
			const proResPath = path.join(
				convertedVideosPath,
				`${videoName}-prores.mov`
			);
			await fs.promises.rm(proResPath, { force: true, recursive: true });

			await execa(avConvert, [
				'-prog',
				'--preset',
				'PresetAppleProRes4444LPCM',
				'--source',
				videoPath,
				'--output',
				proResPath,
			]);

			// HEVC
			const hevcPath = path.join(convertedVideosPath, `${videoName}-hevc.mp4`);
			await fs.promises.rm(hevcPath, { recursive: true, force: true });

			await execa(avConvert, [
				'-prog',
				'--preset',
				'PresetHEVC1920x1080WithAlpha',
				'--source',
				proResPath,
				'--output',
				hevcPath,
			]);

			// WebM
			const webmPath = path.join(convertedVideosPath, `${videoName}-webm.webm`);
			await fs.promises.rm(webmPath, { recursive: true, force: true });
			await execa(ffmpegPath, [
				'-i',
				proResPath,
				'-stats_period',
				'0.1',
				'-c:v',
				'libvpx-vp9',
				'-progress',
				'pipe:1',
				'-nostdin',
				webmPath,
			]);

			// Removing temporary ProRes file
			await fs.promises.rm(proResPath);

			console.info(`Finished converting ${videoPath}!`);
		})
);
