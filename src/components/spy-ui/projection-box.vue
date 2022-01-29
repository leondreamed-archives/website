<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import anime from 'animejs';
import { computed, ref } from 'vue';
import { uiColor } from '~/utils/ui';
import { torontoLocationX, torontoLocationY } from '~/utils/world-map';

const windowSize = useWindowSize();
const projectionBoxWidth = computed(() => windowSize.width.value * 0.75);
const projectionBoxHeight = computed(() => windowSize.height.value * 0.5);
const projectionBoxX = computed(
	() => (windowSize.width.value - projectionBoxWidth.value) / 2
);
const projectionBoxY = computed(
	() => (windowSize.height.value - projectionBoxHeight.value) / 2
);

const projectionBoxRect = ref();

const projectionBoxLines = computed(() => [
	// Top-left
	{
		x2: projectionBoxX.value,
		y2: projectionBoxY.value,
	},
	// Top-right
	{
		x2: projectionBoxX.value + projectionBoxWidth.value,
		y2: projectionBoxY.value,
	},
	// Bottom-left
	{
		x2: projectionBoxX.value,
		y2: projectionBoxY.value + projectionBoxHeight.value,
	},
	// Bottom-right
	{
		x2: projectionBoxX.value + projectionBoxWidth.value,
		y2: projectionBoxY.value + projectionBoxHeight.value,
	},
]);

const animationStarted = ref(false);
async function playProjectionBoxAnimation() {
	let tl = anime
		.timeline({
			begin() {
				animationStarted.value = true;
			},
			easing: 'easeInOutQuad',
		})
		.add({
			targets: [projectionBoxRect.value],
			x: [torontoLocationX.value, projectionBoxX.value],
			y: [torontoLocationY.value, projectionBoxY.value],
			height: [0, projectionBoxHeight.value],
			width: [0, projectionBoxWidth.value],
			opacity: [0, 0.9],
		});

	for (const [i, projectionBoxLine] of projectionBoxLines.value.entries()) {
		tl = tl.add(
			{
				targets: `.projection-box-line-${i + 1}`,
				x2: [torontoLocationX.value, projectionBoxLine?.x2],
				y2: [torontoLocationY.value, projectionBoxLine?.y2],
				opacity: [1, 0],
			},
			0
		);
	}

	await tl.finished;
}

defineExpose({
	playProjectionBoxAnimation,
});
</script>

<template>
	<svg width="100%" height="100%">
		<g v-show="animationStarted">
			<line
				v-for="(projectionBoxLine, i) in projectionBoxLines"
				v-bind="projectionBoxLine"
				:key="i"
				:x1="torontoLocationX"
				:y1="torontoLocationY"
				:stroke="uiColor"
				stroke-width="1"
				:class="`projection-box-line-${i + 1}`"
			/>
		</g>
		<rect
			ref="projectionBoxRect"
			style="opacity: 0"
			:x="projectionBoxX"
			:y="projectionBoxY"
			:width="projectionBoxWidth"
			:height="projectionBoxHeight"
			:stroke="uiColor"
			:fill="uiColor"
			rx="10"
			ry="10"
		></rect>
	</svg>
</template>
