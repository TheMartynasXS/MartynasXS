<script>
  import { T, useTask } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { interactivity } from '@threlte/extras'

  import { spring } from 'svelte/motion'
  import { createNoise2D } from 'simplex-noise'

  import Box from 'comps/Box.svelte'
  import Sphere from 'comps/Sphere.svelte'
  import Plane from 'comps/Plane.svelte'

  interactivity()
  const scale = spring(1)
  export let model = 'plane'
  export let subtype = 'ripple'


  // const noise = createNoise2D()
  // const vertices = geometry.getAttribute('position').array

  // console.log(vertices.length/3)

  // if( model == "plane"){
  //  if(subtype == "ripple"){
  //     for (let i = 0; i < vertices.length; i += 3) {
  //     // Calculate distance from center
  //     const centerX = (vertices[0] + vertices[vertices.length - 3]) / 2;
  //     const centerY = (vertices[1] + vertices[vertices.length - 2]) / 2;
  //     const distance = Math.sqrt(Math.pow(vertices[i] - centerX, 2) + Math.pow(vertices[i + 1] - centerY, 2));

  //     // Adjust displacement based on distance
  //     vertices[i + 2] += Math.sin(distance-Math.PI/2); // Adjust factor for stronger/weaker ripples
  //     }
  //   }
  //   else if(subtype == "wave"){
  //     for (let i = 0; i < vertices.length; i += 3) {
  //       vertices[i + 2] += Math.sin(vertices[i]*2)/2
  //     }
  //   }
  // }


  // for (let i = 0; i < vertices.length; i += 3) {
  //   // Calculate distance from center
  //   const centerX = (vertices[0] + vertices[vertices.length - 3]) / 2;
  //   const centerY = (vertices[1] + vertices[vertices.length - 2]) / 2;
  //   const distance = Math.sqrt(Math.pow(vertices[i] - centerX, 2) + Math.pow(vertices[i + 1] - centerY, 2));

  //   // Adjust displacement based on distance
  //   vertices[i + 2] += Math.sin(distance * 2) / (distance * 2); // Adjust factor for stronger/weaker ripples
  // }
  
  let cameraposition = {x: 20, y: 20, z: 20}


  // look at the center of the scene
	//   let target = {x: 0, y: 0, z: 0}
	//   let camera_offset = {x: 100, y: 10, z: 100}
  
  
  
  // geometry.computeVertexNormals()
  // let rotation = 0
  // useTask((delta) => {
  //   rotation += delta
  // })

  

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

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>

{#if model == "plane"}
  <Plane {subtype}/>
{:else if  model == "box"}
  <Box/>
{:else if model == "sphere"}
  <Sphere/>
{/if}

<!-- {#if model == "plane"}
 
  <T.Mesh
    {geometry}
    rotation={[-Math.PI/2,0,spin]}
    position.y={1}
    scale={$scale}
    on:pointerenter={() => scale.set(1.25)}
    on:pointerleave={() => scale.set(1)}
    castShadow
    >
    <T.MeshStandardMaterial color="hotpink" wireframe /> 
  </T.Mesh>
{:else if  model == "box"}

  <T.Mesh
  rotation={[-Math.PI/2,0,spin]}
  position.y={1}
  scale={$scale}
  on:pointerenter={() => scale.set(1.25)}
  on:pointerleave={() => scale.set(1)}>
    <T.BoxGeometry args={[8, 8, 8, 10,10,10]} />
    <T.MeshStandardMaterial color="hotpink" wireframe/> 
  </T.Mesh>
{:else if model == "sphere"}
  <T.Mesh
  rotation={[-Math.PI/2,0,spin]}
  position.y={1}
  scale={$scale}
  on:pointerenter={() => scale.set(1.25)}
  on:pointerleave={() => scale.set(1)}>
    <T.SphereGeometry args={[4,8,8]}/>
    <T.MeshStandardMaterial color="white"/> 
  </T.Mesh>
  <T.Mesh
  rotation={[-Math.PI/2,0,spin]}
  position.y={1}
  scale={$scale}
  on:pointerenter={() => scale.set(1.25)}
  on:pointerleave={() => scale.set(1)}>
    <T.SphereGeometry args={[4,8,8]}/>
    <T.MeshStandardMaterial color="hotpink" wireframe/> 
  </T.Mesh>
{/if} -->
