<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProjectionBox from './projection-box.vue';
import ScrollDownArrows from './scroll-down-arrows.vue';
import HeaderTabs from './header-tabs.vue';
import RadarLinks from './radar-links.vue';
import StyledBorder from '~/components/spy-ui/styled-border.vue';
import WorldMap from '~/components/spy-ui/world-map.vue';
import { uiHeight, uiWidth } from '~/utils/ui';

const projectionBox = ref<InstanceType<typeof ProjectionBox>>();
const scrollDownArrows = ref<InstanceType<typeof ScrollDownArrows>>();

onMounted(async () => {
	await projectionBox.value?.playProjectionBoxAnimation();
	await scrollDownArrows.value?.playScrollDownArrowsAnimation();
});
</script>

<template>
	<div
		:style="{ height: `${uiHeight}px`, width: `${uiWidth}px` }"
		class="bg-black column"
	>
		<svg :width="uiWidth" :height="uiHeight">
			<StyledBorder />
			<HeaderTabs />
			<RadarLinks />
			<WorldMap />
			<ProjectionBox ref="projectionBox" />
			<ScrollDownArrows ref="scrollDownArrows" />
		</svg>
	</div>
</template>
