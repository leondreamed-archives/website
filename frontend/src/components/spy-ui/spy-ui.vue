<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProjectionBox from './projection-box.vue';
import ScrollDownArrows from './scroll-down-arrows.vue';
import HeaderTabs from './header-tabs.vue';
import RadarLinks from './radar-links.vue';
import StyledBorder from '~/components/spy-ui/styled-border.vue';
import WorldMap from '~/components/spy-ui/world-map.vue';
import { ComponentType } from '~/types/component';
import { useInnerWindowSize } from '~/utils/window';

const windowSize = useInnerWindowSize();

const projectionBox = ref<ComponentType<typeof ProjectionBox>>();
const scrollDownArrows = ref<ComponentType<typeof ScrollDownArrows>>();

onMounted(async () => {
	await projectionBox.value?.playProjectionBoxAnimation();
	await scrollDownArrows.value?.playScrollDownArrowsAnimation();
});
</script>

<template>
	<div class="bg-black column min-h-full">
		<svg
			:width="windowSize.width.value"
			:height="windowSize.height.value"
			:viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
		>
			<StyledBorder />
			<HeaderTabs />
			<RadarLinks />
			<WorldMap />
			<ProjectionBox ref="projectionBox" />
			<ScrollDownArrows ref="scrollDownArrows" />
		</svg>
	</div>
</template>
