<script>
	export let Name = '';
	export let Desc = '';
	export let Color = 'white';

	import BiCpu from 'comps/BiCpu.svelte';
	import BiMemory from 'comps/BiMemory.svelte';
	import BiGpuCard from 'comps/BiGpuCard.svelte';
	import BiHdd from 'comps/BiHdd.svelte';
	import BiMotherboard from 'comps/BiMotherboard.svelte';
</script>

<button
	class="item"
	on:click={() => {
		alert(Desc);
	}}
	style="--color: {Color};"
>
	{#if Name == 'CPU'}
		<BiCpu />
	{:else if Name == 'GPU'}
		<BiGpuCard />
	{:else if Name == 'SSD'}
		<BiHdd />
	{:else if Name == 'RAM'}
		<BiMemory />
	{:else if Name == 'Motherboard'}
		<BiMotherboard />
	{/if}
	<icon />
</button>

<style>
	.item {
		color: var(--color);
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		aspect-ratio: 1;
		transition: all 0.1s ease-in-out;
	}

	button:hover,
	button:focus-within,
	button:active,
	button:focus {
		filter: drop-shadow(0 0 0.75rem var(--shadow));
		transform: scale(1.1);
	}
</style>
