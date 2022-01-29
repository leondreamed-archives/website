<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import anime from 'animejs';
import { ref, computed } from 'vue';

const scrollDownArrows = ref();
const opacityAnimationStarted = ref(false);
async function playScrollDownArrowsAnimation() {
	const minOpacity = 0.5;

	anime({
		targets: [scrollDownArrows.value],
		translateY: [0, 5],
		direction: 'alternate',
		duration: 2000,
		loop: true,
		easing: 'easeInOutQuad',
	});

	await anime({
		begin() {
			opacityAnimationStarted.value = true;
		},
		targets: [scrollDownArrows.value],
		opacity: [0, minOpacity],
		duration: 1000,
		easing: 'easeInQuad',
	}).finished;

	anime({
		targets: [scrollDownArrows.value],
		opacity: [minOpacity, 1],
		direction: 'alternate',
		duration: 2000,
		loop: true,
		easing: 'easeInOutQuad',
	});
}

defineExpose({
	playScrollDownArrowsAnimation,
});

const windowSize = useWindowSize();

const arrowsPaddingBottom = 80;
const arrowsWidth = 30;
const arrowsHeight = 50;
const arrowsX = computed(() => windowSize.width.value / 2);
const arrowsY = computed(
	() => windowSize.height.value - arrowsHeight - arrowsPaddingBottom
);
</script>

<template>
	<svg
		v-show="opacityAnimationStarted"
		ref="scrollDownArrows"
		viewBox="0 0 20 30"
		:width="arrowsWidth"
		:height="arrowsHeight"
		:x="arrowsX - arrowsWidth / 2"
		:y="arrowsY"
	>
		<g stroke="#fff8" stroke-width="2">
			<path
				d="
					M 0 0
					l 10 10
					l 10 -10
				"
			/>
			<path
				d="
					M 0 12
					l 10 10
					l 10 -10
				"
			/>
		</g>
	</svg>
</template>
