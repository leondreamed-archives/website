<script setup lang="ts">
const tabs = [
	{
		title: 'About',
		to: '#about',
	},
	{
		title: 'Projects',
		to: '#projects',
	},
	{
		title: 'Contact',
		to: '#contact',
	},
];
</script>

<template>
	<svg>
		<foreignObject>
			<router-link v-for="(tab, i) of tabs" :key="i" :to="tab.to">
				<div>{{ tab.title }}</div>
			</router-link>
		</foreignObject>
	</svg>
</template>
