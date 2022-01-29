<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useWindowSize } from '@vueuse/core';
import LocationTarget from './location-target.vue';
import ProjectionBox from './projection-box.vue';
import StyledBorder from '~/components/spy-ui/styled-border.vue';
import WorldMap from '~/components/spy-ui/world-map.vue';
import { ComponentType } from '~/types/component';

const windowSize = useWindowSize();

const locationTarget = ref<ComponentType<typeof LocationTarget>>();
const projectionBox = ref<ComponentType<typeof ProjectionBox>>();

onMounted(async () => {
	await locationTarget.value?.playTargetAnimation();
	await projectionBox.value?.playProjectionBoxAnimation();
});
</script>

<template>
	<div class="bg-black column min-h-full">
		<svg
			width="100%"
			height="100%"
			:viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
		>
			<StyledBorder />
			<WorldMap />
			<LocationTarget ref="locationTarget" />
			<ProjectionBox ref="projectionBox" />
		</svg>
	</div>
</template>
