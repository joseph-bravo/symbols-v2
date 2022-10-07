<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import { processSarBuffer, renderSar } from '$lib/utils/symbol-tools';
	import type { SymbolArt } from '$lib/utils/symbol-tools';

	let files: FileList | null | undefined;
	let processed: SymbolArt;
	let rendered: string;

	const parseIt = async (files: FileList) => {
		const file = files[0];

		console.count('hello');
		processed = processSarBuffer(await file.arrayBuffer());
		rendered = await renderSar(processed);
		console.log('huh');
	};

	$: if (files instanceof FileList && files[0]) {
		parseIt(files);
	}

	$: console.log(rendered);
	$: console.log(processed);
</script>

<h1 class="text-center font-black text-4xl">render!</h1>

<input type="file" bind:files />

<div class="flex justify-center gap-2">
	<a href="/" class="btn">Home</a>
	<a href="/test" class="btn">test</a>
	<a href="/render" class="btn">render</a>
</div>
