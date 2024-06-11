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
  <T.CylinderGeometry args={[8,8,8,data.subdivisions]}/>
    <T.MeshLambertMaterial color="rgb(98, 98, 235)" wireframe/> 
  </T.Mesh>
{/if}
<!-- If display is combined or solid -->
{#if display != "wireframe"}
  <T.Mesh
  position.y={1}
  scale={1}>
    <T.CylinderGeometry args={[8,8,8,data.subdivisions]}/>
    <T.MeshNormalMaterial color="white"/> 
  </T.Mesh>
{/if}