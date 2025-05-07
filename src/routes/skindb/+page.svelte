<script>
	import { onMount } from 'svelte';

	let output = {};
	let selectedChampion = localStorage.getItem('selected_champion') ?? '1';

	$: localStorage.setItem('selected_champion', selectedChampion);

	async function fetchData() {
		try {
			const [champData, skinData] = await Promise.all([
				fetch(
					'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
				).then((res) => res.json()),
				fetch(
					'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json'
				).then((res) => res.json())
			]);

			processData(champData, skinData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function processData(champData, skinData) {
		const champAliasMap = champData.reduce((acc, champ) => {
			if (champ.name !== 'None') {
				acc[String(champ.id)] = champ.alias.toLowerCase();
			}
			return acc;
		}, {});

		output = champData.reduce((acc, champ) => {
			const cid = String(champ.id);
			if (champ.name !== 'None') {
				const alias = champAliasMap[cid];
				acc[alias] = {
					id: cid,
					name: champ.name,
					skins: {}
				};
			}
			return acc;
		}, {});
		
		Object.entries(skinData).forEach(([skin, skinDetails]) => {
			const cid = String(parseInt(skin.slice(0, -3)));
			const sid = String(parseInt(skin.slice(-3)));

			if (champAliasMap[cid]) {
				const alias = champAliasMap[cid];
				output[alias].skins[sid] = {
					name: skinDetails.name,
					loadscreen: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skinDetails.loadScreenPath
						.replace('/lol-game-data/assets/', '')
						.toLowerCase()}`
				};

				if (skinDetails.chromas) {
					output[alias].skins[sid].chromas = skinDetails.chromas.map((chroma) => ({
						id: parseInt(String(chroma.id).slice(-3)),
						colors: chroma.colors
					}));
				}
			}
		});
		// sorted by name
		output = Object.fromEntries(Object.entries(output).sort((a, b) => a[1].name.localeCompare(b[1].name)));
	}

	onMount(fetchData);
</script>

<svelte:head>
	<title>SkinDB</title>
	<meta name="description" content="Skin database for League of Legends" />
	<meta name="keywords" content="League of Legends, Skins, SkinDB" />
	<meta name="author" content="MartynasXS" />
</svelte:head>

<div class="page">
	<div class="header">
		<a href="/">Home</a>
	</div>
	<div>
		<!-- centered select -->
		<div class="input-group">
			<label for={'Display'}>Select Champion:</label>
			<select id={'SelectedChamp'} bind:value={selectedChampion}>
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
					<div class="skin">
						<div class="side_img">
							<img src={output[selectedChampion].skins[key].loadscreen} alt={key.name} />
						</div>

						<div class="skin-info">
							<h3>
								{output[selectedChampion].skins[key].name} - <span class="highlight">skin{key}</span>
							</h3>
							{#if output[selectedChampion].skins[key].chromas != undefined}
								<h4>Chromas:</h4>
								<div class="chroma-list">
									{#each output[selectedChampion].skins[key].chromas as chroma}
										<div class="chroma">
											<span
												class="chroma-badge"
												style="background: linear-gradient( -45deg, {chroma.colors[0]}, {chroma
													.colors[0]} 50%, {chroma.colors[1]} 50%, {chroma.colors[1]});"
											/>
											skin{chroma.id}
										</div>
									{/each}
								</div>
							{:else}
								<h4>No Chromas</h4>
							{/if}
						</div>
						<!-- <p>{data[selected_champion].skins[key]}</p> -->
					</div>
				{/each}
			</div>
		{:else}
			"loading."
		{/if}
	</div>
</div>

<!-- for entry in data -->
<style>
	.header {
		background-color: #444;
		padding: 1rem;
	}

	.header a {
		color: #fff;
		text-decoration: none;
	}
	.page {
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	select {
		background: #303136;
	}
	label {
		word-break: keep-all;
	}

	/* Add or modify these classes to style cards */
	.skin-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(300px, 1fr));
		max-width: 70%;
		margin-inline: auto;
		justify-content: center;
		/* center */
		margin-block: 1rem;
		flex-direction: column; /* Only one card per row */
		gap: 1rem;
		margin-top: 1rem;
	}
	/* media */
	@media (max-width: 650px) {
		.skin-list {
			grid-template-columns: 1fr;
		}
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
	.skin {
		background-color: #2b2b2e;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		display: flex; /* Lay out image and text side by side */

		flex-direction: row; /* Row so image is on the side */
		width: 100%; /* Make the card fill available width */
		color: #fff; /* Vertically center items if desired */
	}

	.side_img {
		width: 150px; /* Fixed width for the image area */
		height: 100%; /* Ensure full height coverage */
		overflow: hidden;
		background: #000;
		display: grid;
		place-items: center;
	}
	span.highlight {
		color: #f0f;
	}
	.side_img img {
		width: 100%;
		height: auto;
		display: block;
	}

	.skin h3 {
		text-align: center;
		padding: 0.5rem;
		padding-block: 1rem;
		margin: 0;
		/* font-size: from 1.2 to 1.5; */
		font-size: 1.2rem;
		background-color: #00000022;
	}
	.skin h4 {
		text-align: center;
		font-size: 1rem;
	}
	div.chroma-list {
		display: grid;
		gap: 0.5rem;
		list-style-type: none;
		grid-template-columns: 1fr 1fr;
		padding-bottom: 2rem;
	}
	/* small viewport */
	/* chroma list 1 column */
	@media (max-width: 1200px) {
		div.chroma-list {
			grid-template-columns: 1fr !important;
		}
	}
	/* Optional: add a container for text to size the content area */
	.skin > div:last-child {
		/* padding: 0.5rem; */
		flex: 1; /* Take remaining space for text content */
		display: flex;
		flex-direction: column;
	}
	.chroma-badge {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		margin-right: 0.5rem;
		border: 2px inset var(--bg-300);
	}
	.chroma-list > .chroma {
		display: flex;
		margin-inline: auto;
		align-items: center;
	}
</style>
