<script setup lang="ts">
import SpyUi from '~/components/spy-ui/spy-ui.vue';
</script>

<template>
	<div class="bg-gray-200 column min-h-full">
		<SpyUi ref="spyUi" />
		<div v-for="n in 200" :key="n">some stuff about me</div>
	</div>
</template>
