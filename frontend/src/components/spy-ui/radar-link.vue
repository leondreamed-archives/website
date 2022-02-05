<script setup lang="ts">
import TransparentVideo from '~/components/transparent-video.vue';

const props = defineProps<{
	name: string;
	icon: string;
}>();
</script>

<template>
	<TransparentVideo video-name='radar' loop />
</template>
