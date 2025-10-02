<script>
	import Card from "$lib/components/Card.svelte";
	import Navbar from "$lib/components/Navbar.svelte";

	let output = $state({});

	fetch("https://skindb.martynasxs.dev/data.json")
		.then((res) => res.json())
		.then((obj) => {
			output = obj.data;
		});
	let selectedChampion = $state(
		localStorage.getItem("selected_champion") ?? "1",
	);

	$effect(() => {
		localStorage.setItem("selected_champion", selectedChampion);
	});
</script>

<Navbar />

<div class="input-group">
	<label for={"Display"}>Select Champion:</label>
	<select id={"SelectedChamp"} bind:value={selectedChampion}>
		{#if Object.keys(output).length > 0}
			{#each Object.keys(output) as key}
				<option value={key}>{output[key].name}</option>
			{/each}
		{/if}
	</select>
</div>
{#if output[selectedChampion] != undefined}
	<div class="skin-list">
		{#each Object.keys(output[selectedChampion].skins) as key}
			<Card
				skin={output[selectedChampion].skins[key]}
				skinID={key}
				champID={output[selectedChampion].id}
			/>
		{/each}
	</div>
{:else}
	<div class="skin-list">
		<Card />
		<Card />
		<Card />
		<Card />
	</div>
{/if}

<style>
	select {
		background: var(--bg-300);
	}
	label {
		word-break: keep-all;
	}

	/* Add or modify these classes to style cards */
	.skin-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 35rem));
		max-width: 90%;
		margin-inline: auto;
		justify-content: center;
		/* center */
		margin-block: 1rem;
		flex-direction: column; /* Only one card per row */
		gap: 2rem;
		margin-top: 1rem;
	}

	.input-group {
		display: flex;
		align-items: center;
		margin: 1rem auto;
		justify-content: center;
	}

	.input-group label {
		margin-right: 0.5rem;
		color: #fff;
		font-weight: bold;
	}

	#SelectedChamp {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: #fff;
		border: 1px solid #666;
	}
</style>
