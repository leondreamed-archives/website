<script setup lang="ts">
import { mdiLinkedin, mdiGithub } from '@mdi/js';
import RadarLink from './radar-link.vue';

const links = [
	{
		name: 'Linkedin',
		icon: mdiLinkedin,
	},
	{
		name: 'GitHub',
		icon: mdiGithub,
	},
];
</script>

<template>
	<RadarLink />
</template>
