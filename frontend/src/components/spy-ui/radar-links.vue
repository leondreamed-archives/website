<script setup lang="ts">
import { mdiLinkedin, mdiGithub } from '@mdi/js';

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
	<svg>
		<circle v-for="(link, i) of links" :key="i"></circle>
	</svg>
</template>
