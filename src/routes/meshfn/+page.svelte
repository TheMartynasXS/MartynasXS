<script>
    import { Canvas } from '@threlte/core'
    import Scene from 'comps/Scene.svelte'

    let rotation = 0
    let model = 'plane'
    let subtype = 'normal'
    let is_mobile = matchMedia('(max-width: 600px)').matches
</script>

<style>
    .Page {
        display: flex;
        height: 100%;
    }
    .Page > div{
        padding:1rem;
        margin: 1rem;
        display:grid;
        gap:1rem;
        grid-template-rows: repeat(8, 2rem);
    }
    .Page > div,
    select,
    option{
        width: 300px;
        color:white;
        padding-inline: 1rem;
        /* From https://css.glass */
        background: rgba(7, 7, 7, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12.5px);
        -webkit-backdrop-filter: blur(12.5px);
        border: 1px solid rgba(7, 7, 7, 0.45);
    }
    section {
        position:absolute;
        width: 100%;
        height: 100%;
    }
    select{
        background: #303136;
    }
</style>

<div class="Page">
    {#if is_mobile}
        <div>This device is too small to render the 3D scene</div>
    {:else}
        <section>
            <Canvas>
                <Scene bind:rotate_camera={rotation} bind:subtype bind:model/>
            </Canvas>
        </section>
        <div>
            <select bind:value={model}>
                <option value={"plane"}> plane </option>
                <option value={"box"}> box </option>
                <option value={"sphere"}> sphere </option>
            </select>
            {#if model == "plane"}
                <select bind:value={subtype}>
                    <option value={"normal"}> Normal </option>
                    <option value={"ripple"}> Sine(Ripple) </option>
                    <option value={"wave"}> Sine(Wave) </option>
                </select>
            {/if}
            <!-- <input style="flex:4;" type="range" bind:value={rotation} min={0} max={6.3} step={0.01}> -->
        </div>
    {/if}
</div>
