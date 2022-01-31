<script setup lang="ts">
import WorldMapSilhouette from '~/assets/world-map-silhouette.svg';
import { uiColor } from '~/utils/ui';
import {
	worldMapMaxHeight,
	worldMapMaxWidth,
	worldMapPadding,
} from '~/utils/world-map';
</script>

<template>
	<WorldMapSilhouette
		style="opacity: 0.2"
		:width="worldMapMaxWidth"
		:height="worldMapMaxHeight"
		:x="worldMapPadding"
		:y="worldMapPadding"
		:fill="uiColor"
	/>
</template>
