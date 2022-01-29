<script setup lang="ts">
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
</script>

<template>
	<svg :viewBox="`0 0 ${width} ${height}`" width="200px" height="200px">
		<g class="target">
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

<style scoped>
.target {
	transform-origin: 50% 50%;
	animation: rotate 30s;
}

@keyframes rotate {
	0% {
		transform: rotateZ(0deg);
		width: 100px;
	}

	100% {
		transform: rotateZ(270deg);
		width: 0px;
	}
}
</style>
