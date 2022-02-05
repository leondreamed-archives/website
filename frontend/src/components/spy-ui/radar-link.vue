<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TransparentVideo from '~/components/transparent-video.vue';

const props = defineProps<{
	name: string;
	icon: string;
}>();

const width = 200;
const height = 200;

const radarVideo = ref<HTMLVideoElement>();
onMounted(() => {
	radarVideo.value!.playbackRate = 0;
});
</script>

<template>
	<svg>
		<foreignObject :width="width" :height="height">
			<TransparentVideo
				ref="radarVideo"
				video-name="radar"
				loop
				autoplay
				:width="width"
				:height="height"
				class="absolute"
			/>
			<div class="w-full h-full column center">
				<v-icon class="text-white" :path="icon"></v-icon>
			</div>
		</foreignObject>
	</svg>
</template>
