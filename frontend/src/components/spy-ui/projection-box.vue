<script setup lang="ts">
import { ref, computed } from 'vue';
import TransparentVideo from '../transparent-video.vue';
import { ComponentType } from '~/types/component';
import {
	torontoLocationX,
	torontoLocationY,
	worldMapHeight,
	worldMapWidth,
} from '~/utils/world-map';

const animationWidth = computed(() => worldMapWidth.value * 0.8);
const animationHeight = computed(() => worldMapHeight.value * 0.8);

const animationX = computed(
	() => torontoLocationX.value - animationWidth.value * 0.135
);
const animationY = computed(
	() => torontoLocationY.value - animationHeight.value * 0.37
);

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
