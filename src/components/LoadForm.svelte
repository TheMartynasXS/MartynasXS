<script>
    import {liveQuery} from 'dexie'
    import {db} from 'stores/database'

    export let data;
    export let open;

    let models = liveQuery(() => db.models.toArray())
    let selectedModel = models?.length > 0 ? 0 : null;
	export function loadForm(id) {
        
        db.models.get(id).then(model => {
            data = model.params
            console.log(model.params)
            open = false;
        })
        
	}
	
	let value = '';

    function handleClick(){
        if(selectedModel == null) {
            alert("No models selected or models db is empty")
        }
        else{
            loadForm(selectedModel)
        }
    }
</script>

<style>
    button{
        background-color:#303136;
        color:aliceblue;
        border-radius: 16px;
    }
    button:hover{
        cursor:pointer;
        background-color: rgb#6262eb;
    }
    form > * {
        height: 2rem;
        height: 10%;
    }
    form {
        padding:1rem;
        width: 26rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display:flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 20rem;
    }
    form, .input-group.backdrop{
        color:aliceblue;
        padding-inline: 1rem;
        background: rgba(7, 7, 7, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12.5px);
        -webkit-backdrop-filter: blur(12.5px);
        border: 1px solid rgba(7, 7, 7, 0.45);
    }
    .input-group{
        display:flex;
        gap:0.5rem;
        align-items:center;
    }
    ul{
        list-style-type: none;
        padding-inline-start: 0;
        max-height: 20rem;
        overflow-y: auto;
    }
    li{
        min-height: 2rem;
        margin-block: 0.5rem;
    }
    .input-group > label{
        display:flex;
        align-items:center;
    }
    .input-group > input{
        margin-left: auto;
    }
    .input-group > button{
        min-height: 2rem;
        padding-inline: 1rem;
    }
    input[type="radio"]{
        transform: scale(2);
        accent-color: rgb#6262eb;
    }
    input[type="radio"]:hover{
        cursor:pointer;
    }
    .flex{
        flex:1;
    }
    
</style>

<form on:submit|preventDefault={loadForm}>
    {#if $models}
        <ul>
            {#each $models as model(model.id)}
                <li class="input-group backdrop">
                    <label for="model">{model.name == "" ? model.id : model.name} , {model.params.type} {model.params.type == "plane" ? `(${model.params.subtype})`: ""}
                    </label>
                    <input type="radio" name="model" value={model.id} bind:group={selectedModel}>
                    <button on:click={()=>{db.models.delete(model.id)}}>Delete</button>
                </li>
            {:else}
                <li class="input-group backdrop">
                    <label class="flex" for="Name">No models saved</label>
                </li>
            {/each}
        </ul>
    {/if}
    <div class="input-group">
        <button class="flex" on:click={handleClick}>
            Load selected model
        </button>
        <button class="flex" on:click={()=>{open=false}}>
            Close
        </button>
</form>