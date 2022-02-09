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
	() => torontoLocationX.value - animationWidth.value * 0.136
);
const animationY = computed(
	() => torontoLocationY.value - animationHeight.value * 0.37
);

const animationStarted = ref(false);
const animationFinished = ref(false);
const projectionVideo = ref<ComponentType<typeof TransparentVideo>>();
async function playProjectionBoxAnimation() {
	animationStarted.value = true;
	await projectionVideo.value?.video?.play();
	projectionVideo.value?.video?.addEventListener('ended', () => {
		animationFinished.value = true;
	});
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
				class="relative"
			>
				<TransparentVideo
					ref="projectionVideo"
					:width="animationWidth"
					:height="animationHeight"
					video-name="projection"
				/>
				<div v-show="animationFinished">
					<div class="top-[34%] left-[28.5%] absolute text-white">
						<img src="~/assets/selfie.jpeg" class='opacity-[0.75] rounded-full w-[30%] border-[rgb(62_254_255)] border-[5px]' />
					</div>
				</div>
			</foreignObject>
		</g>
	</svg>
</template>
