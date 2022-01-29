<script setup lang="ts">
import anime from 'animejs';
import { ref } from 'vue';
import { uiColor } from '~/utils/ui';
import { torontoLocationX, torontoLocationY } from '~/utils/world-map';

const finalTargetSize = 15;
const initialTargetSize = 200;
const viewBoxSize = 20;

const circleRadiusPercentage = 0.65; // 65% of the total size
const circleRadius = (viewBoxSize * circleRadiusPercentage) / 2;

const spikeLength = (viewBoxSize - 2 * circleRadius) / 2;

const topSpikeLine = {
	x1: spikeLength + circleRadius,
	y1: 0,
	x2: spikeLength + circleRadius,
	y2: spikeLength,
};

const leftSpikeLine = {
	x1: 0,
	y1: spikeLength + circleRadius,
	x2: spikeLength,
	y2: spikeLength + circleRadius,
};

const rightSpikeLine = {
	x1: viewBoxSize,
	y1: spikeLength + circleRadius,
	x2: viewBoxSize - spikeLength,
	y2: spikeLength + circleRadius,
};

const bottomSpikeLine = {
	x1: spikeLength + circleRadius,
	y1: viewBoxSize,
	x2: spikeLength + circleRadius,
	y2: viewBoxSize - spikeLength,
};

const spikeLines = [
	topSpikeLine,
	leftSpikeLine,
	rightSpikeLine,
	bottomSpikeLine,
];

const targetG = ref();

async function playTargetAnimation() {
	await anime({
		targets: [targetG.value],
		rotateZ: [0, 315],
		scale: [1, finalTargetSize / initialTargetSize],
		duration: 2000,
		easing: 'cubicBezier(.1, .82, .34, 1.1)',
	}).finished;

	await anime({
		targets: [targetG.value],
		opacity: [1, 0],
		direction: 'alternate',
		duration: 200,
		loop: 4,
		easing: 'linear',
	}).finished;
}

defineExpose({
	playTargetAnimation,
});
</script>

<template>
	<svg
		:viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
		:width="initialTargetSize"
		:height="initialTargetSize"
		:x="torontoLocationX - initialTargetSize / 2"
		:y="torontoLocationY - initialTargetSize / 2"
	>
		<g ref="targetG" class="target">
			<line
				v-for="(spikeLine, i) of spikeLines"
				:key="i"
				v-bind="spikeLine"
				:stroke="uiColor"
			/>
			<circle
				fill="none"
				:cx="spikeLength + circleRadius"
				:cy="spikeLength + circleRadius"
				:stroke="uiColor"
				:r="circleRadius"
			></circle>
		</g>
	</svg>
</template>

<style>
.target {
	transform-origin: 50% 50%;
}
</style>
