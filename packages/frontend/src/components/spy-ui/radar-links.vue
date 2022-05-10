<script setup lang="ts">
import { mdiLinkedin, mdiGithub } from '@mdi/js';
import { computed } from 'vue';
import RadarLink from './radar-link.vue';

const links = [
	{
		name: 'Linkedin',
		icon: mdiLinkedin,
		href: 'https://linkedin.com/in/leonzalion',
	},
	{
		name: 'GitHub',
		icon: mdiGithub,
		href: 'https://github.com/leonzalion',
	},
];

const linkGap = 30;
const linkSize = 70;
const numLinks = links.length;
const totalLinksWidth = linkSize * numLinks + linkGap * (numLinks - 1);
const firstLinkLeftBound = computed(
	() => 1280 / 2 - totalLinksWidth / 2
);
const linkY = 100;

function getLinkX(linkIndex: number) {
	return firstLinkLeftBound.value + linkIndex * (linkGap + linkSize);
}
</script>

<template>
	<RadarLink
		v-for="(link, linkIndex) of links"
		v-bind="link"
		:key="link.name"
		:x="getLinkX(linkIndex)"
		:y="linkY"
		:size="linkSize"
	/>
</template>
