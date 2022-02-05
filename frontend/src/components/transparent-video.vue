<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ videoName: string }>();
const video = ref<HTMLVideoElement>();

defineExpose({
	video,
});
</script>

<template>
	<video ref="video" muted>
		<source
			:src="`videos/${videoName}-hevc.mp4`"
			type='video/mp4; codecs="hvc1"'
		/>
		<source
			:src="`videos/${videoName}-webm.webm`"
			type="video/webm"
		/>
	</video>
</template>
