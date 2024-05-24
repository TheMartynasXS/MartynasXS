<script>
    export let data;
    export let open;
</script>

<style>
    div{
        position:absolute;
        height: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
<div>
	<slot {data} {open}/>
</div>