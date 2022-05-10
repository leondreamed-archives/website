import { computed } from 'vue';
import { uiHeight, uiWidth } from './ui';

export const worldMapPadding = 100;
export const worldMapAspectRatio = 980 / 504;

export const worldMapMaxHeight = computed(
	() => uiHeight - 2 * worldMapPadding
);
export const worldMapMaxWidth = computed(
	() => uiWidth - 2 * worldMapPadding
);

export const worldMapWidth = computed(() =>
	Math.min(
		worldMapMaxHeight.value * worldMapAspectRatio,
		worldMapMaxWidth.value
	)
);
export const worldMapHeight = computed(
	() => worldMapWidth.value / worldMapAspectRatio
);

export const torontoLocationX = computed(
	() =>
		worldMapPadding +
		(worldMapMaxWidth.value - worldMapWidth.value) / 2 +
		worldMapWidth.value * 0.255
);
export const torontoLocationY = computed(
	() =>
		worldMapPadding +
		(worldMapMaxHeight.value - worldMapHeight.value) / 2 +
		worldMapHeight.value * 0.375
);
