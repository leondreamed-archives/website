import { got } from 'got';
import type {
	CamelcasedWakatimeStatsResponse,
	WakatimeData,
} from '~/types/wakatime';

export async function getWakatimeData(): Promise<WakatimeData> {
	const response = await got.get(
		'https://wakatime.com/api/v1/users/leonzalion/stats/last_7_days'
	);

	const result = JSON.parse(response.body) as CamelcasedWakatimeStatsResponse;

	const wakatimeData: WakatimeData = {
		dailyAverage: result.data.dailyAverage,
		totalSeconds: result.data.totalSeconds,
		languages: result.data.languages.map(({ name, totalSeconds }) => ({
			name,
			totalSeconds,
		})),
		projects: result.data.projects.map(({ name, totalSeconds }) => ({
			name,
			totalSeconds,
		})),
	};

	return wakatimeData;
}
