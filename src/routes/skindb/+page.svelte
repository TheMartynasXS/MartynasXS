<script>
	let output = {};

	let lastUpdate = new Date();
	fetch('https://skindb.martynasxs.dev/data.json')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			output = data.data;
			//timestamp:	"2025-05-20T21:00:47.745Z"
			lastUpdate = new Date(data.timestamp);
		});
	let selectedChampion = localStorage.getItem('selected_champion') ?? '1';

	$: localStorage.setItem('selected_champion', selectedChampion);
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
		<p>Last update: {lastUpdate.toLocaleDateString()}</p>
	</div>
	<div>
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
							{#if output[selectedChampion].skins[key].tiers != undefined}
								<h3>
									{output[selectedChampion].skins[key].name}
								</h3>
							{:else}
								<h3>
									{output[selectedChampion].skins[key].name} -
									<span class="highlight">skin{key}</span>
								</h3>
							{/if}
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
							{:else if output[selectedChampion].skins[key].tiers != undefined}
								<h4>Tiers:</h4>
								{#each output[selectedChampion].skins[key].tiers as tier}
									<div class="tier" style="padding:0.5rem">
										{tier.name} <span class="highlight">skin{tier.id}</span>
									</div>
								{/each}
							{:else}
								<h4>No Chromas</h4>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			"loading."
		{/if}
	</div>
</div>

<style>
	.header {
		background-color: #444;
		padding: 1rem;
		display: flex;
	}

	.header a {
		color: #fff;
		text-decoration: none;
	}
	.header > * {
		margin-block: 1rem;
	}
	.header > p {
		margin-left: auto;
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
