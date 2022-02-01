import * as path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import { got } from 'got';
import yaml from 'js-yaml';
import camelcaseKeys from 'camelcase-keys';
import { getConfigsPath } from '../paths.js';
import type {
	CamelcasedRescuetimeResponse,
	RescuetimeConfig,
	RescuetimeData,
} from '~/types/rescuetime.js';

export async function getRescuetimeData(): Promise<RescuetimeData> {
	const configsPath = getConfigsPath();
	const rescuetimeConfig = yaml.load(
		fs.readFileSync(path.join(configsPath, 'rescuetime.yaml')).toString()
	) as RescuetimeConfig;

	console.info('Retrieving RescueTime data...');

	const response = await got.get(
		`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}&format=json`
	);

	const result = camelcaseKeys(
		JSON.parse(response.body)
	) as CamelcasedRescuetimeResponse;

	function checkAllowListMatch(str: string) {
		for (const allowListEntry of rescuetimeConfig.allowList) {
			if ('regex' in allowListEntry) {
				for (const regex of [allowListEntry.regex].flat()) {
					if (new RegExp(regex, 'i').test(str)) return true;
				}
			} else {
				for (const name of [allowListEntry.name].flat()) {
					if (str === name) return true;
				}
			}
		}

		return false;
	}

	const top5Activities = result.rows.slice(0, 5);

	const rescuetimeData = {
		topActivities: [],
	} as RescuetimeData;

	for (const activity of top5Activities) {
		const [_rank, timeSpent, _numPeople, activityName, category, productivity] =
			activity;

		rescuetimeData.topActivities.push({
			category,
			name: checkAllowListMatch(activityName) ? activityName : '[unpublished]',
			productivity,
			timeSpent,
		});
	}

	return rescuetimeData;
}
