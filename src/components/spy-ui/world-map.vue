<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';
import WorldMapSilhouette from '~/assets/world-map-silhouette.svg';
import { uiColor } from '~/utils/constants';
import LocationTarget from '~/components/spy-ui/location-target.vue';

const worldMapPadding = 100;

const windowSize = useWindowSize();

const worldMapAspectRatio = 980 / 504;

const worldMapMaxHeight = computed(
	() => windowSize.height.value - 2 * worldMapPadding
);
const worldMapMaxWidth = computed(
	() => windowSize.width.value - 2 * worldMapPadding
);

const worldMapWidth = computed(() =>
	Math.min(
		worldMapMaxHeight.value * worldMapAspectRatio,
		worldMapMaxWidth.value
	)
);
const worldMapHeight = computed(
	() => worldMapWidth.value / worldMapAspectRatio
);

const torontoLocationX = computed(
	() =>
		(worldMapMaxWidth.value - worldMapWidth.value) / 2 +
		worldMapWidth.value * 0.255
);
const torontoLocationY = computed(
	() =>
		(worldMapMaxHeight.value - worldMapHeight.value) / 2 +
		worldMapHeight.value * 0.375
);
</script>

<template>
	<svg>
		<WorldMapSilhouette
			style="opacity: 0.1"
			:width="worldMapMaxWidth"
			:height="worldMapMaxHeight"
			:x="worldMapPadding"
			:y="worldMapPadding"
			:fill="uiColor"
		/>
		<LocationTarget :x="torontoLocationX" :y="torontoLocationY" />
	</svg>
</template>
