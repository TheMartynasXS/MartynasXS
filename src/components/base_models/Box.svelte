<script>
    import { T } from '@threlte/core'
    export let data
    export let display
</script>

<!-- If display is combined or wireframe -->
{#if display != "solid"}
  <T.Mesh
  rotation={[0,0,0]}
  position.y={1}
  scale={1}>
    <T.BoxGeometry args={[10, 10, 10, data.subdivisions,data.subdivisions,data.subdivisions]} />
    <T.MeshStandardMaterial color="rgb(98, 98, 235)" wireframe/> 
  </T.Mesh>
{/if}
<!-- If display is combined or solid -->
{#if display != "wireframe"}
  <T.Mesh
  rotation={[0,0,0]}
  position.y={1}
  scale={1}>
    <T.BoxGeometry args={[10, 10, 10, data.subdivisions,data.subdivisions,data.subdivisions]} />
    <T.MeshStandardMaterial color="white"/> 
  </T.Mesh>
{/if}



