<script>
    import { T } from '@threlte/core'
    export let data;
    export let display;
</script>

<!-- If display is combined or wireframe -->
{#if display != "solid"}
  <T.Mesh
  position.y={1}
  scale={1}>
    <T.SphereGeometry args={[8,data.subdivisions,data.subdivisions]}/>
    <T.MeshStandardMaterial color="rgb(98, 98, 235)" wireframe/> 
  </T.Mesh>
{/if}
<!-- If display is combined or solid -->
{#if display != "wireframe"}
  <T.Mesh
  position.y={1}
  scale={1}>
    <T.SphereGeometry args={[8,data.subdivisions,data.subdivisions]}/>
    <T.MeshStandardMaterial color="white"/> 
  </T.Mesh>
{/if}



