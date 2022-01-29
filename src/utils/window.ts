import { tryOnMounted, useEventListener } from '@vueuse/core';
import { ref } from 'vue';

// Tweaked version of: https://github.com/vueuse/vueuse/blob/main/packages/core/useWindowSize/index.ts
export function useInnerWindowSize({
	initialWidth = Number.POSITIVE_INFINITY,
	initialHeight = Number.POSITIVE_INFINITY,
} = {}) {
	const width = ref(initialWidth);
	const height = ref(initialHeight);

	const update = () => {
		width.value = document.body.clientWidth;
		height.value = document.body.clientHeight;
	};

	update();
	tryOnMounted(update);
	useEventListener('resize', update, { passive: true });

	return { width, height };
}
