export type WakatimeData = {
	totalSeconds: number;
	dailyAverage: number;
	projects: Array<{
		name: string;
		totalSeconds: number;
	}>;
	languages: Array<{
		name: string;
		totalSeconds: number;
	}>;
};

export type CamelcasedWakatimeStatsResponse = {
	data: {
		totalSeconds: number;
		humanReadableTotal: string;
		dailyAverage: number;
		humanReadableDailyAverage: string;
		projects: Array<{
			/**
			 * Project name
			 */
			name: string;
			/**
			 * Total coding activity as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent in this project
			 */
			percent: number;
			/**
			 * Total coding activity for this project in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this project
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this project
			 */
			minutes: number;
		}>;
		languages: Array<{
			/**
			 * Language name
			 */
			name: string;
			/**
			 * Total coding activity spent in this language as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent in this language
			 */
			percent: number;
			/**
			 * Total coding activity for this language in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity for this language in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this language
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this language
			 */
			minutes: number;
			/**
			 * Seconds portion of coding activity for this language
			 */
			seconds: number;
		}>;
		editors: Array<{
			/**
			 * Editor name
			 */
			name: string;
			/**
			 * Total coding activity spent in this editor as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent in this editor
			 */
			percent: number;
			/**
			 * Total coding activity for this editor in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity for this editor in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this editor
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this editor
			 */
			minutes: number;
			/**
			 * Seconds portion of coding activity for this editor
			 */
			seconds: number;
		}>;
		operatingSystems: Array<{
			/**
			 * Dependency name
			 */
			name: string;
			/**
			 * Total coding activity spent in this dependency as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent in this dependency
			 */
			percent: number;
			/**
			 * Total coding activity for this dependency in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this dependency
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this dependency
			 */
			minutes: number;
			/**
			 * Seconds portion of coding activity for this dependency
			 */
			seconds: number;
		}>;
		dependencies: Array<{
			/**
			 * Dependency name
			 */
			name: string;
			/**
			 * Total coding activity spent in this dependency as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent in this dependency
			 */
			percent: number;
			/**
			 * Total coding activity for this dependency in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this dependency
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this dependency
			 */
			minutes: number;
			/**
			 * Seconds portion of coding activity for this dependency
			 */
			seconds: number;
		}>;
		machines: Array<{
			/**
			 * Machine hostname and ip address
			 */
			name: string;
			/**
			 * Unique ID of this machine
			 */
			machineNameId: string;
			/**
			 * Total coding activity spent on this machine as seconds
			 */
			totalSeconds: number;
			/**
			 * Percent of time spent on this machine
			 */
			percent: number;
			/**
			 * Total coding activity for this machine in digital clock format
			 */
			digital: string;
			/**
			 * Total coding activity in human readable format
			 */
			text: string;
			/**
			 * Hours portion of coding activity for this machine
			 */
			hours: number;
			/**
			 * Minutes portion of coding activity for this machine
			 */
			minutes: number;
			/**
			 * Seconds portion of coding activity for this machine
			 */
			seconds: number;
		}>;
		bestDay: {
			/**
			 * Day with most coding time logged as Date string in YEAR-MONTH-DAY format
			 */
			date: string;
			/**
			 * Total coding activity for this day in human readable format
			 */
			text: string;
			/**
			 * Number of seconds of coding activity for this day
			 */
			totalSeconds: number;
		};
		/**
		 * Time range of these stats
		 */
		range: string;
		/**
		 * Number of days in this range with no coding time logged
		 */
		holidays: number;
		/**
		 * Number of days in this range
		 */
		daysIncludingHolidays: number;
		/**
		 * Status of these stats in the cache
		 */
		status: string;
		/**
		 * True if these stats are being updated in the background
		 */
		isAlreadyUpdating: boolean;
		/**
		 * True if this user's coding activity is publicly visible
		 */
		isCodingActivityVisible: boolean;
		/**
		 * True if this user's languages, editors, and operating system stats are publicly visible
		 */
		isOtherUsageVisible: boolean;
		/**
		 * True if these stats got stuck while processing and will be recalculated in the background
		 */
		isStuck: boolean;
		/**
		 * True if these stats include the current day, normally false except range "all_time"
		 */
		isIncludingToday: boolean;
		/**
		 * True if these stats are up to date; when false, stats are missing or from an old time range and will be refreshed soon
		 */
		isUpToDate: boolean;
		/**
		 * Start of this time range as ISO 8601 format
		 */
		start: string;
		/**
		 * End of this time range as ISO 8601 format
		 */
		end: string;
		/**
		 * Timezone used in Olson Country/Region format
		 */
		timezone: string;
		/**
		 * Value of the user's timeout setting in minutes
		 */
		timeout: number;
		/**
		 * Status of the user's writesOnly setting
		 */
		writesOnly: boolean;
		/**
		 * Unique ID of tihs user
		 */
		userId: string;
		/**
		 * Public username for this user
		 */
		username: string;
		/**
		 * Time when these stats were created in ISO 8601 format
		 */
		createdAt: string;
		/**
		 * Time when these stats were last updated in ISO 8601 format
		 */
		modifiedAt: string;
	};
};
