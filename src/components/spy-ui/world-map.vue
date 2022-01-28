<script setup lang="ts">
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import WorldMapSilhouette from '~/assets/world-map-silhouette.svg';
import { uiColor } from '~/utils/constants';

const windowSize = useWindowSize();
const worldMapHeight = computed(
	() => windowSize.height.value - 2 * worldMapPadding
);
const worldMapWidth = computed(
	() => windowSize.width.value - 2 * worldMapPadding
);

const worldMapPadding = 100;
</script>

<template>
	<WorldMapSilhouette
		:width="worldMapWidth"
		:height="worldMapHeight"
		:x="worldMapPadding"
		:y="worldMapPadding"
		:fill="uiColor"
	/>
</template>
