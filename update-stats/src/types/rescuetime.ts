export type CamelcasedRescuetimeResponse = {
	notes: string;
	rowHeaders: [string, string, string, string, string, string];
	/**
	 * [Rank, Time Spent (Seconds), Number of People, Activity, Category, Productivity]
	 */
	rows: Array<[number, number, number, string, string, number]>;
};

export type RescuetimeConfig = {
	allowList: Array<{ regex: string | string[] } | { name: string | string[] }>;
};

export type RescuetimeActivity = {
	name: string;
	/**
	 * Time spent on the activity in milliseconds.
	 */
	timeSpent: number;
	category: string;
	/**
	 * Productivity from 1-5 (1 = Very Distracting, 2 = Distracting, 3 = Neutral, 4 = Productive, 5 = Very Productive)
	 */
	productivity: number;
};

export type RescuetimeData = {
	topActivities: RescuetimeActivity[];
};
