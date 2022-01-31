/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			RESCUETIME_API_KEY: string;
			WAKATIME_API_KEY: string;
			GITHUB_ACCESS_TOKEN: string;
		}
	}
}
