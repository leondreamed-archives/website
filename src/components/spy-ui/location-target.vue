<script setup lang="ts">
import anime from 'animejs';
import { onMounted, ref } from 'vue';
import { uiColor } from '~/utils/constants';

const width = 20;
const height = 20;

const circleRadius = 6.5;

const spikeLength = (height - 2 * circleRadius) / 2;

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
	x1: width,
	y1: spikeLength + circleRadius,
	x2: width - spikeLength,
	y2: spikeLength + circleRadius,
};

const bottomSpikeLine = {
	x1: spikeLength + circleRadius,
	y1: height,
	x2: spikeLength + circleRadius,
	y2: height - spikeLength,
};

const spikeLines = [
	topSpikeLine,
	leftSpikeLine,
	rightSpikeLine,
	bottomSpikeLine,
];

const targetG = ref();
onMounted(async () => {
	await anime({
		targets: [targetG.value],
		rotateZ: [0, 315],
		scale: [1, 0.05],
		duration: 2000,
		easing: 'cubicBezier(.1, .82, .34, 1.1)',
	}).finished;

	anime({
		targets: [targetG.value],
		opacity: [1, 0],
		direction: 'alternate',
		duration: 200,
		loop: 4,
		easing: 'linear',
	});
});
</script>

<template>
	<svg :viewBox="`0 0 ${width} ${height}`" width="200px" height="200px">
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
