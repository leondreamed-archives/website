<script setup lang="ts">
import { mdiLinkedin, mdiGithub } from '@mdi/js';
import { computed } from 'vue';
import RadarLink from './radar-link.vue';
import { useInnerWindowSize } from '~/utils/window';

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

const windowSize = useInnerWindowSize();
const linkGap = 30;
const linkSize = 70;
const numLinks = links.length;
const totalLinksWidth = linkSize * numLinks + linkGap * (numLinks - 1);
const firstLinkLeftBound = computed(
	() => windowSize.width.value / 2 - totalLinksWidth / 2
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
