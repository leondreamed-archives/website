<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ videoName: string }>();
const video = ref<HTMLVideoElement>();

const isProduction = import.meta.env.PROD;
const hevcVideoSrc = isProduction
	? `https://leonzalion-website-files.s3.us-east-1.amazonaws.com/videos/${props.videoName}-hevc.mp4`
	: `videos/${props.videoName}-hevc.mp4`;

const webmVideoSrc = isProduction
	? `https://leonzalion-website-files.s3.us-east-1.amazonaws.com/videos/${props.videoName}-webm.webm`
	: `videos/${props.videoName}-webm.webm`;

defineExpose({
	video,
});
</script>

<template>
	<video ref="video" muted>
		<source :src="hevcVideoSrc" type='video/mp4; codecs="hvc1"' />
		<source :src="webmVideoSrc" type="video/webm" />
	</video>
</template>
