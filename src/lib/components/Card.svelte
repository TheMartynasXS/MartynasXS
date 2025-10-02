<script>
	let { skin, skinID, champID } = $props();

	let preview = $state("");
	if (!skin && !skinID && !champID) {
		skin = {
			name: "",
			loadscreen: "",
			rarity: "",
		};
	}
	function onMouseEnter(url) {
		preview = url;
		console.log("Preview URL:", preview);
	}

	function onMouseLeave() {
		preview = "";
	}
</script>

<div class="card">
	<div class="image-container">
		{#if skin && skin.loadscreen}
			<img
				class="image"
				src={skin.loadscreen}
				class:dimmed={preview != ""}
				width="100%"
				alt={skin.name}
			/>
		{:else}
			<div class="placeholder"></div>
		{/if}
		{#if skin.rarity == "kEpic"}
			<img class="rarity" src="/icons/epic.png" alt="Epic Skin" />
		{:else if skin.rarity == "kLegendary"}
			<img
				class="rarity"
				src="/icons/legendary.png"
				alt="Legendary Skin"
			/>
		{:else if skin.rarity == "kMythic"}
			<img class="rarity" src="/icons/mythic.png" alt="Mythic Skin" />
		{:else if skin.rarity == "kUltimate"}
			<img class="rarity" src="/icons/ultimate.png" alt="Ultimate Skin" />
		{:else if skin.rarity == "kExalted"}
			<img class="rarity" src="/icons/exalted.png" alt="Exalted Skin" />
		{:else if skin.rarity == "kTranscendent"}
			<img
				class="rarity"
				src="/icons/transcendent.png"
				alt="Transcendent Skin"
			/>
		{:else}
			<img class="rarity" src="/icons/standard.png" alt="normal skin" />
		{/if}
		<img
			class="preview"
			src={preview}
			style="display: {preview ? 'block' : 'none'};"
			alt={"hover preview"}
		/>
	</div>
	<div class="content">
		<div class="title">
			{#if skin.isLegacy}
				<img src="/icons/icon-legacy.png" alt="Legacy Skin" />
			{/if}
			{#if skin.isPBE}
				<img src="/icons/pbe.webp" alt="PBE Skin" />
			{/if}
			<span class="skin-name">{skin.name}</span>
			<span class="skinid">&nbsp;(skin {skinID})</span>
		</div>
		<div class="left">
			<ul>
				<li>
					{#if skin.name != ""}
						<a
							href="https://modelviewer.lol/model-viewer?id={champID}{skinID
								.toString()
								.padStart(3, '0')}"
							target="_blank">View in 3D</a
						><br />
					{/if}
				</li>
			</ul>
		</div>
		<div class="right">
			{#if skin.chromas && skin.chromas.length > 0}
				<ul>
					{#each skin.chromas as chroma}
						<li
							onmouseenter={() => onMouseEnter(chroma.tile)}
							onmouseleave={() => onMouseLeave()}
						>
							<div
								class="color_badge"
								style="--a_color:{chroma
									.colors[0]}; --b_color:{chroma.colors[1]}"
							></div>
							<div>
								<a
									href="https://modelviewer.lol/model-viewer?id={champID}{skinID
										.toString()
										.padStart(
											3,
											'0',
										)}&chroma={champID}{chroma.id
										.toString()
										.padStart(3, '0')}"
									target="_blank"
									>skin {chroma.id} (3d viewer)</a
								>
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<div style="margin:auto;">No chromas available</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.skin-name {
		/* limit to number of words per line */
	}
	.card {
		display: grid;
		grid-template-columns: 10rem 1fr;
	}
	.image-container {
		position: relative;
		width: 100%;
		height: auto;
		aspect-ratio: 308/560;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
	.image {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 308/560;
		border-radius: 0.5rem 0 0 0.5rem;
	}
	.dimmed {
		filter: brightness(0.1);
	}
	.rarity {
		position: absolute;
		left: 50%;
		bottom: -0.75rem;
		transform: translateX(-50%);
		width: 2.5rem;
		padding: 0.2rem;
		filter: drop-shadow(0 2px 0.25rem rgba(0, 0, 0, 1));
		z-index: 2;
	}
	.content {
		display: grid;
		grid-template-areas:
			"title title"
			"left right";
		grid-template-columns: 3fr 4fr;
		grid-template-rows: 4rem 1fr;
		gap: 0.5rem;

		background: rgba(18, 18, 18, 0.4);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(13.1px);
		-webkit-backdrop-filter: blur(13.1px);
		border: 1px solid rgba(18, 18, 18, 0.4);

		border-radius: 0 0.5rem 0.5rem 0;
		height: 100%; /* Ensure content fills the card */
		min-height: 15rem; /* Or whatever minimum you want */
	}
	.content .title {
		grid-area: title;
		display: flex;
		place-content: center;
		align-items: center;

		background: rgba(18, 18, 18, 0.4);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(13.1px);
		-webkit-backdrop-filter: blur(13.1px);
		border: 1px solid rgba(18, 18, 18, 0.4);

		height: 4rem;
		gap: 0.25rem;
		border-radius: 0 0.5rem 0 0;
		padding-inline: 1rem;
	}
	.title img {
		width: 1.5rem;
		height: 1.5rem;
	}
	.title .skinid {
		color: var(--text-muted);
		min-width: fit-content;
		word-break: keep-all;
		word-wrap: none;
	}
	.color_badge {
		background: var(--b_color);
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 0 50% 50% 0;
		margin-left: 0.25rem;
	}
	.color_badge::before {
		content: " ";
		position: relative;
		background: var(--a_color);
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		left: -0.5rem;
	}
	.left {
		grid-area: left;
		display: flex;
		/* Add your left content styles */
	}
	.left li {
		list-style: none;
	}
	.right {
		display: flex;
		border-left: 1px solid var(--bg-100);
		grid-area: right;
		overflow-y: auto;
		max-height: calc(13rem); /* Set a max-height for scrolling */
		padding: 0;
		/* place-items: center; */
	}
	.right ul {
		margin: 0;
		padding: 0;
	}
	.right li {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-block: 0.5rem;
		padding-inline-start: 1.25rem;
	}
	.left li {
		padding-block: 0.5rem;
	}
	.preview {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 150%;
		transform: translate(-50%, -50%);
		margin: 0;
		display: none;
	}
	.placeholder {
		height: 100%;
		width: 100%;
		background: rgba(18, 18, 18, 0.4);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(13.1px);
		-webkit-backdrop-filter: blur(13.1px);
		border: 1px solid rgba(18, 18, 18, 0.4);
		border-radius: 0.5rem 0 0 0.5rem;
	}
</style>
