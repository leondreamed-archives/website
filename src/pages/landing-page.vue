<script setup lang="ts">
import { ref, onMounted } from 'vue';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SpyUi from '~/components/spy-ui/spy-ui.vue';

type A = typeof SpyUi extends new () => infer T ? T : never;

const spyUi = ref<A>();
onMounted(() => {
	console.log(spyUi.value?.$data);
});
</script>

<template>
	<div class="bg-gray-200 column min-h-full">
		<SpyUi ref="spyUi" />
	</div>
</template>
