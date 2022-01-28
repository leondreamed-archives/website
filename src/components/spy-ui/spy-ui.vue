<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import StyledBorder from '~/components/spy-ui/styled-border.vue';
import WorldMap from '~/components/spy-ui/world-map.vue';
import LocationTarget from '~/components/spy-ui/location-target.vue';

const windowSize = useWindowSize();

function playTargetAnimation() {
	console.log(LocationTarget);
}

defineExpose({
	playTargetAnimation,
});
</script>

<template>
	<div class="bg-gray-200 column min-h-full">
		<svg
			width="100%"
			height="100%"
			:viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
		>
			<StyledBorder />
			<WorldMap />
		</svg>
	</div>
</template>
