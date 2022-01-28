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
	<svg width="100%" height="100%" :viewBox="`0 0 ${width} ${height}`">
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
	</svg>
</template>
