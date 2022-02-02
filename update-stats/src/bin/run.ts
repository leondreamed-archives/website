import process from 'node:process';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import 'dotenv/config.js';
import { updateGithubRepo } from '~/utils/github.js';
import { getGithubData } from '~/utils/update/github.js';
import { getRescuetimeData } from '~/utils/update/rescuetime.js';
import { getWakatimeData } from '~/utils/update/wakatime.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Toronto');

console.log('gh', process.env.SOME_UNDEFINED_SECRET, process.env.RESCUETIME_API_KEY[0]);

const [githubData, rescuetimeData, wakatimeData] = await Promise.all([
	getGithubData(),
	getRescuetimeData(),
	getWakatimeData(),
]);

const commitSha = await updateGithubRepo({
	githubData,
	rescuetimeData,
	wakatimeData,
});

console.info(`Successfully updated the GitHub repo (commit SHA: ${commitSha})`);
