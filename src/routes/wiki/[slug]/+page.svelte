<script>
  export let data;
  import SvelteMarkdown from 'svelte-markdown'
  const source = fetch(`http://localhost:5173/markdown/${data.slug}.md`).then(r => r.text())

</script>


{#await source}

{:then value}
  <SvelteMarkdown source={value} />
{/await}