/* eslint-disable @typescript-eslint/naming-convention */

import 'dotenv/config.js';
import process from 'node:process';
import stream from 'node:stream';
import path from 'node:path';
import fs from 'node:fs';
import awsSdk from 'aws-sdk';
import { Listr } from 'listr2';
import {
	getHevcVideoPath,
	getWebmVideoPath,
	updateCompositionVideos,
} from '../utils/index.js';

// Ensures that the composition videos are updated before they are uploaded to S3
const updatedCompositions = await updateCompositionVideos();

const { S3 } = awsSdk;

if (process.env.AWS_ACCESS_KEY_ID === undefined) {
	throw new Error('AWS_ACCESS_KEY_ID not found in environment.');
}

if (process.env.AWS_SECRET_ACCESS_KEY === undefined) {
	throw new Error('AWS_SECRET_ACCESS_KEY not found in environment.');
}

const s3 = new S3({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const uploadStream = ({ Bucket, Key }: { Bucket: string; Key: string }) => {
	const pass = new stream.PassThrough();
	return {
		writeStream: pass,
		promise: s3.upload({ Bucket, Key, Body: pass }).promise(),
	};
};

// Upload the composition videos to S3
const uploadTasks = new Listr([]);
for (const composition of updatedCompositions) {
	const webmPath = getWebmVideoPath(composition);
	uploadTasks.add({
		title: `Uploading ${path.basename(webmPath)}`,
		async task() {
			const webmReadStream = fs.createReadStream(webmPath);
			const { writeStream: webmWriteStream, promise: webmPromise } =
				uploadStream({
					Bucket: 'leonzalion-website-files',
					Key: `videos/${path.basename(webmPath)}`,
				});
			webmReadStream.pipe(webmWriteStream);
			await webmPromise;
		},
	});

	const hevcPath = getHevcVideoPath(composition);
	uploadTasks.add({
		title: `Uploading ${path.basename(hevcPath)}`,
		async task() {
			const hevcReadStream = fs.createReadStream(hevcPath);
			const { writeStream: hevcWriteStream, promise: hevcPromise } =
				uploadStream({
					Bucket: 'leonzalion-website-files',
					Key: `videos/${path.basename(hevcPath)}`,
				});
			hevcReadStream.pipe(hevcWriteStream);
			await hevcPromise;
		},
	});
}

await uploadTasks.run();

process.exit(0);
