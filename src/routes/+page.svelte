<script>
    import { onMount } from "svelte";
    import Card from "../lib/component/Card.svelte";
    let output = $state({});

    let lastUpdate = $state(new Date());

    let selectedChampion = $state("aatrox");

    onMount(() => {
        fetch("https://skindb.martynasxs.dev/data.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                output = data.data;
                //timestamp:	"2025-05-20T21:00:47.745Z"
                lastUpdate = new Date(data.timestamp);
                selectedChampion =
                    localStorage.getItem("selected_champion") ?? "aatrox";
            });
    });

    function handleChampionChange(event) {
        selectedChampion = event.target.value;
        localStorage.setItem("selected_champion", selectedChampion);
    }
</script>

<div class="page">
    <div class="header">
        <a href="/">Home</a>
        <p>Last update: {lastUpdate.toLocaleDateString()}</p>
    </div>
    <div>
        <div class="input-group">
            <label for={"Display"}>Select Champion:</label>
            <select
                id={"SelectedChamp"}
                bind:value={selectedChampion}
                onchange={handleChampionChange}
            >
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
            "loading."
        {/if}
    </div>
</div>

<style>
    .header {
        background-color: var(--bg-100);
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
        background-color: var(--bg-200);
    }

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
