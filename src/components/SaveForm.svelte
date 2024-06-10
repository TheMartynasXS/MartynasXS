<script>
    import {db} from 'stores/database'

    export let data;
    export let open;
	export async function saveForm() {
        if (value == '') value = "unnamed"
        db.models.add({name: value, params: data })
        open = false;
	}
	
	let value = '';
</script>

<style>
    button,input{
        background-color:#303136;
        color:aliceblue;
        border-radius: 16px;
        flex:1;
    }
    input{
        height:100%;
        padding-inline-start: 1rem;
    }
    button:hover{
        cursor:pointer;
        background-color: var(--accent);
    }
    form > * {
        height: 2rem;
    }
    form {
        padding:1rem;
        width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color:aliceblue;
        padding-inline: 1rem;
        background: rgba(7, 7, 7, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12.5px);
        -webkit-backdrop-filter: blur(12.5px);
        border: 1px solid rgba(7, 7, 7, 0.45);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .input-group{
        display:flex;
        gap:0.5rem;
    }
    .input-group > label{
        display:flex;
        align-items:center;
    }
    
    
</style>

<form on:submit|preventDefault={saveForm}>
    <div class="input-group">
        <label for="Name">Model name:</label>
        <input id="Name" placeholder="Name" bind:value>
    </div>
    <div class="input-group">
        <button type="submit">
            Save
        </button>
        <button on:click={() => open = false}>
            Cancel
        </button>
    </div>
</form>