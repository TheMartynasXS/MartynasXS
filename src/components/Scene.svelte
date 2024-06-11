<script>
  import { T, useTask,useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { GLTFExporter, } from 'three/addons/exporters/GLTFExporter.js';
  import { createNoise2D } from 'simplex-noise'

  import Box from 'comps/base_models/Box.svelte'
  import Sphere from 'comps/base_models/Sphere.svelte'
  import Plane from 'comps/base_models/Plane.svelte'
  import Cylinder from 'comps/base_models/Cylinder.svelte'

  export let data;
  export let display
  
  let cameraposition = {x: 20, y: 20, z: 20}

  const {scene} = useThrelte()
  export const ExportFunction= ()=>{
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      // called when the gltf has been generated
      function ( result ) {
        //save the glb from result to a file
        const blob = new Blob( [ result ], { type: 'model/gltf-binary' } );
        const url = URL.createObjectURL( blob );
        const a = document.createElement( 'a' );
        a.href = url;
        a.download = 'Model.glb';
        a.click();
        URL.revokeObjectURL( url );
      },
      // called when there is an error in the generation
      function ( error ) {
        console.log( 'An error happened' );
      },
      {
        binary: true,
      });
  }
</script>


<T.PerspectiveCamera
	makeDefault
	position={[
		cameraposition.x,
		cameraposition.y,
		cameraposition.z
	]}

	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}>

	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} />


{#if data.type == "plane"}
  <Plane {data} {display}/>
{:else if data.type == "box"}
  <Box {data} {display}/>
{:else if data.type == "sphere"}
  <Sphere {data} {display}/>
{:else if data.type == "cylinder"}
  <Cylinder {data} {display}/>
{/if}
