<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TransparentVideo from '~/components/transparent-video.vue';
import { uiColor } from '~/utils/ui';

defineProps<{
	x: number;
	y: number;
	size: number;
	name: string;
	icon: string;
	href: string;
}>();

const radarVideo = ref<HTMLVideoElement>();
onMounted(() => {
	radarVideo.value!.playbackRate = 0;
});
</script>

<template>
	<svg>
		<foreignObject :x="x" :y="y" :width="size" :height="size">
			<TransparentVideo
				ref="radarVideo"
				video-name="radar"
				loop
				autoplay
				:width="size"
				:height="size"
				class="absolute -z-10"
			/>
			<a
				class="w-full h-full column center z-10 group"
				:href="href"
				target="_blank"
			>
				<v-icon
					:style="{ color: uiColor }"
					class="hover:scale-125 transform transition-transform"
					:size="size * 0.7"
					:path="icon"
				></v-icon>
			</a>
		</foreignObject>
	</svg>
</template>
