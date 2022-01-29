<script setup lang="ts">
import { ref, computed } from 'vue';
import TransparentVideo from '../transparent-video.vue';
import { ComponentType } from '~/types/component';
import { useInnerWindowSize } from '~/utils/window';
import { torontoLocationX, torontoLocationY } from '~/utils/world-map';

const { height, width } = useInnerWindowSize();
const animationWidth = computed(() => width.value / 2);
const animationHeight = computed(() => height.value / 2);

const animationX = computed(() => torontoLocationX.value - 160.5);
const animationY = computed(() => torontoLocationY.value - 81);

const animationStarted = ref(false);
const projectionVideo = ref<ComponentType<typeof TransparentVideo>>();
async function playProjectionBoxAnimation() {
	animationStarted.value = true;
	await projectionVideo.value?.video?.play();
}

defineExpose({
	playProjectionBoxAnimation,
});
</script>

<template>
	<svg width="100%" height="100%">
		<g v-show="animationStarted">
			<foreignObject
				:x="animationX"
				:y="animationY"
				:width="animationWidth"
				:height="animationHeight"
			>
				<TransparentVideo
					ref="projectionVideo"
					:width="animationWidth"
					:height="animationHeight"
					video-name="projection"
				/>
			</foreignObject>
		</g>
	</svg>
</template>
