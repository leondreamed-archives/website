export type CamelcasedRescuetimeResponse = {
	notes: string;
	rowHeaders: [string, string, string, string, string, string];
	/**
	 * [Rank, Time Spent (Seconds), Number of People, Activity, Category, Productivity]
	 */
	rows: [number, number, number, string, string, number];
};
