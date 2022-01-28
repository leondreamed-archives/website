<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWindowSize } from '@vueuse/core';
import bezierEasing from 'bezier-easing';
import { uiColor } from '~/utils/constants';

const windowSize = useWindowSize();

const glowingBorderPadding = 50;

const glowingBorderPath = computed(() => {
	const padding = glowingBorderPadding;

	const width = windowSize.width.value - 2 * padding;
	const height = windowSize.height.value - 2 * padding;

	const triangleCornerSize = Math.min(
		Math.max((1 / 50) * width, (1 / 50) * height),
		30
	);
	const triangleCornerWidth = triangleCornerSize;
	const triangleCornerHeight = triangleCornerSize;

	// The protrusion is the "dip" in the middle of the glowing border edge
	const xProtrusionWidth = (1 / 3) * width;
	// The depth of the protrusion is how much it goes away from the border edge
	const xProtrusionDepth = Math.min((1 / 25) * height, 20);
	// The ledge are the diagonal lines in the protrusion
	const xProtrusionLedgeWidth = Math.min((1 / 10) * xProtrusionWidth, 25);
	// The plateau is the flat part of the protrusion
	const xProtrusionPlateauWidth = xProtrusionWidth - 2 * xProtrusionLedgeWidth;

	const yProtrusionHeight = (1 / 3) * height;
	const yProtrusionDepth = Math.min((1 / 50) * width, 25);
	const yProtrusionLedgeHeight = (1 / 10) * yProtrusionHeight;
	const yProtrusionPlateauHeight =
		yProtrusionHeight - 2 * yProtrusionLedgeHeight;

	const xOuterSectionWidth =
		(width - 2 * triangleCornerWidth - xProtrusionWidth) / 2;
	const yOuterSectionHeight =
		(height - 2 * triangleCornerHeight - yProtrusionHeight) / 2;

	const path = `
		M ${padding + triangleCornerWidth} ${padding}
		l ${xOuterSectionWidth} 0
		l ${xProtrusionLedgeWidth} ${xProtrusionDepth}
		l ${xProtrusionPlateauWidth} 0
		l ${xProtrusionLedgeWidth}, ${-xProtrusionDepth}
		l ${xOuterSectionWidth} 0
		l ${triangleCornerWidth} ${triangleCornerHeight}
		l 0 ${yOuterSectionHeight}
		l ${-yProtrusionDepth} ${yProtrusionLedgeHeight}
		l 0 ${yProtrusionPlateauHeight}
		l ${yProtrusionDepth} ${yProtrusionLedgeHeight}
		l 0 ${yOuterSectionHeight}
		l ${-triangleCornerWidth} ${triangleCornerHeight}
		l ${-xOuterSectionWidth} 0
		l ${-xProtrusionLedgeWidth} ${-xProtrusionDepth}
		l ${-xProtrusionPlateauWidth} 0
		l ${-xProtrusionLedgeWidth} ${xProtrusionDepth}
		l ${-xOuterSectionWidth} 0
		l ${-triangleCornerWidth} ${-triangleCornerHeight}
		l 0 ${-yOuterSectionHeight}
		l ${yProtrusionDepth} ${-yProtrusionLedgeHeight}
		l 0 ${-yProtrusionPlateauHeight}
		l ${-yProtrusionDepth} ${-yProtrusionLedgeHeight}
		l 0 ${-yOuterSectionHeight}
		l ${triangleCornerWidth} ${-triangleCornerHeight}
		z
	`;

	return path;
});

const minBlur = 2.5;
const maxBlur = 4;
const blurDiff = maxBlur - minBlur;
const blurStdDeviation = ref(maxBlur);

const easing = bezierEasing(0, 0, 1, 0.5);

let previousTimestamp: DOMHighResTimeStamp;

/**
 * Animates the border blur effect. Starts with weak blur.
 */
function animateBlur(timestamp: DOMHighResTimeStamp) {
	if (previousTimestamp === undefined) {
		previousTimestamp = timestamp;
	}

	const elapsed = timestamp - previousTimestamp;
	const cycleLength = 2000; // Cycle length in milliseconds
	const halfCycleLength = cycleLength / 2;

	// Between 0 and 10000 milliseconds
	const cycleTimestamp = elapsed % cycleLength;

	let blur;
	// Increasing blur
	if (cycleTimestamp < cycleLength / 2) {
		blur = maxBlur - blurDiff * easing(cycleTimestamp / halfCycleLength);
	} else {
		blur =
			maxBlur -
			blurDiff * easing((cycleLength - cycleTimestamp) / halfCycleLength);
	}

	blurStdDeviation.value = blur;

	requestAnimationFrame(animateBlur);
}

requestAnimationFrame(animateBlur);
</script>

<template>
	<svg>
		<defs>
			<filter id="blur">
				<feGaussianBlur in="SourceGraphic" :stdDeviation="blurStdDeviation" />
			</filter>
		</defs>
		<path
			stroke-linejoin="round"
			:stroke="uiColor"
			filter="url(#blur)"
			stroke-width="4"
			:d="glowingBorderPath"
			fill="none"
		></path>
	</svg>
</template>
