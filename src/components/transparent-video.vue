<script setup lang="ts">
defineProps<{ videoName: string }>();
</script>

<template>
	<video width="600" height="100%" autoplay loop muted playsinline>
		<source
			:src="`videos/converted/${videoName}-hevc.mp4`"
			type='video/mp4; codecs="hvc1"'
		/>
		<source
			:src="`videos/converted/${videoName}-webm.webm`"
			type="video/webm"
		/>
	</video>
</template>
