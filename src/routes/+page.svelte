<script>
    import { Canvas, useThrelte } from '@threlte/core'
    import Scene from 'comps/Scene.svelte'
    import SaveForm from 'comps/SaveForm.svelte'
    import LoadForm from 'comps/LoadForm.svelte'

    let is_mobile = matchMedia('(max-width: 600px)').matches
    let showSave = false;
    let showLoad = false;


    let scene_ref = null;

    function SaveModal(){
        showLoad = false;
        showSave = true;
    }
    function LoadModal(){
        showSave = false;
        showLoad = true;
    }
    // reference to load and save modals
    let save
    let load
    
    let display = "solid";
    let data = {
        type:'box',
        subtype:'normal',
        subdivisions:1,
        multiplier:0.25,
        strength:1
    }
</script>

<style>
    .page {
        font-family: Arial, sans-serif;
        display: flex;
        height: 100%;
    }
    .page > aside {
        padding:1rem;
        margin: 1rem;
        display:flex;
        gap:1rem;
        flex-direction: column;
    }
    .input-group{
        display:flex;
        gap:0.5rem;
        min-height: 2rem;
    }
    .input-group > label{
        display:flex;
        align-items:center;
    }
    .input-group.top-margin{
        margin-top:auto;
    }
    .input-group > select{
        display:flex;
        width:auto;
        min-width: 0px;
        flex:1;
    }
    .input-group > button{
        height: 100%;
        flex:1;
        background-color:#303136;
        color:aliceblue;
        border-radius: 16px;
    }
    .input-group > button:hover{
        cursor:pointer;
        background-color: rgb(98, 98, 235);
    }
    input{
        accent-color: rgb(98, 98, 235);;
    }
    .page > aside{
        width: 300px;
    }
    .page > aside,
    select,
    option,
    input[type="number"]{
        color:aliceblue;
        padding-inline: 1rem;
        background: rgba(7, 7, 7, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12.5px);
        -webkit-backdrop-filter: blur(12.5px);
        border: 1px solid rgba(7, 7, 7, 0.45);
    }
    main {
        position:absolute;
        width: 100%;
        height: 100%;
    }
    select{
        background: #303136;
    }
    input[type="range"]{
        width: 0px;
        flex:auto;
        min-width: 0px;
    }
    label{
        word-break: keep-all;
    }
</style>

<div class="page">
    {#if is_mobile}
        <div>This device is too small to render the 3D scene</div>
    {:else}
        <main>
            <Canvas>
                <Scene bind:this={scene_ref} {data} {display}/>
            </Canvas>
        </main>
        <aside>
            <div class="input-group">
                <label for={"Display"}>Display:</label>
                <select id={"Display"} bind:value={display}>
                    <option value={"solid"}> solid </option>
                    <option value={"wireframe"}> wireframe </option>
                    <option value={"combined"}> combined </option>
                </select>
            </div>
            <div class="input-group">
                <label for={"TypeSelect"}>Type:</label>
                <select id={"TypeSelect"} bind:value={data.type}>
                    <option value={"plane"}> plane </option>
                    <option value={"box"}> box </option>
                    <option value={"sphere"}> sphere </option>
                </select>
            </div>
            {#if data.type == "plane"}
                <div class="input-group">   
                    <label for={"SubTypeSelect"}>Subtype:</label>
                    <select id={"SubTypeSelect"} bind:value={data.subtype}>
                        <option value={"normal"}> Normal </option>
                        <option value={"ripple"}> Sine(Ripple) </option>
                        <option value={"wave"}> Sine(Wave) </option>
                    </select>
                </div >
                
            {/if}
            {#if data.type != "plane" || data.type == "plane" && data.subtype != "normal"}
            <div class="input-group">
                <label for={"Subdivision"}>{"Subdivisions: [1-100]"}</label>
                <input id={"Subdivision"} type="range" bind:value={data.subdivisions} min={1} max={100} step={1}>
            </div>
            {/if}

            {#if data.type == "plane" && data.subtype != "normal"}
                <div class="input-group">
                    <label for={"Multiplier"}>{"Multiplier [±5]:"}</label>
                    <input id={"Multiplier"} type="number" bind:value={data.multiplier} min={-9} max={9} step={0.25}>
                </div>
                <div class="input-group">
                    <label for={"Strength"}>{"Strength [±5]:"}</label>
                    <input id={"Strength"} type="number" bind:value={data.strength} min={-9} max={9} step={0.25}>
                </div>
            {/if}
            <div class="input-group top-margin">
                <button class="button" on:click={SaveModal}>Save</button>
                <button class="button" on:click={LoadModal}>Load</button>
            </div>
            <div class="input-group">
                <button class="button" on:click={scene_ref.ExportFunction()}>Export / Download</button>
            </div>
            <div class="input-group special">
                <button class="button" on:click={()=>{open("https://github.com/TheMartynasXS/")}}>Dev. GitHub</button>
            </div>
        </aside>
    {/if}
    {#if showSave}

        <SaveForm bind:save {data} bind:open={showSave}/>

    {/if}
    {#if showLoad}
        <LoadForm bind:load bind:data={data} bind:open={showLoad}/>
    {/if}
</div>
