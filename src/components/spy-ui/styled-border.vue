<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import anime from 'animejs';
import { uiColor } from '~/utils/ui';

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

const blurFe = ref();
onMounted(() => {
	anime({
		targets: [blurFe.value],
		stdDeviation: [minBlur, maxBlur],
		loop: true,
		direction: 'alternate',
		easing: 'easeInOutQuad',
	});
});
</script>

<template>
	<svg>
		<defs>
			<filter id="blur">
				<feGaussianBlur
					ref="blurFe"
					:stdDeviation="maxBlur"
					in="SourceGraphic"
				/>
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
