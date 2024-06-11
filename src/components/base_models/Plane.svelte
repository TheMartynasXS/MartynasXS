<script>
    import { T } from '@threlte/core'
    import { PlaneGeometry } from 'three'

    export let data;
    export let display; 
    let geometry;

    //------------------------------------------------------------------
    // Create a plane geometry with the specified number of subdivisions
    //------------------------------------------------------------------
    $: {
        let sub_count = data.subtype == "normal"? 1 : data.subdivisions
        geometry = new PlaneGeometry(15, 15, sub_count, sub_count)
        if( data.subtype == "ripple"){
            let vertices = geometry.getAttribute('position').array
            for (let i = 0; i < vertices.length; i += 3) {
                // Calculate distance from center
                const centerX = (vertices[0] + vertices[vertices.length - 3]) / 2;
                const centerY = (vertices[1] + vertices[vertices.length - 2]) / 2;
                const distance = data.multiplier * Math.sqrt(Math.pow(vertices[i] - centerX, 2) + Math.pow(vertices[i + 1] - centerY, 2));
                // Adjust displacement based on distance
                vertices[i + 2] += data.strength * Math.sin(distance-Math.PI/2); // Adjust factor for stronger/weaker ripples
            }
        }
        else if (data.subtype == "wave"){
            let vertices = geometry.getAttribute('position').array
            for (let i = 0; i < vertices.length; i += 3) {
                vertices[i + 2] += data.strength * Math.sin(data.multiplier * vertices[i]*2)/2
            }
        }
        geometry.attributes.position.needsUpdate = true
        geometry.computeVertexNormals()
        geometry.center()
    }
</script>

<!-- If display is combined or wireframe -->
{#if display != "solid"}
    <T.Mesh
    {geometry}
    rotation={[-Math.PI/2,0,0]}
    scale={1}
    castShadow>
    <T.MeshLambertMaterial color="rgb(98, 98, 235)" wireframe/> 
    </T.Mesh>
{/if}
<!-- If display is combined or solid -->
{#if display != "wireframe"}
    <T.Mesh
    {geometry}
    rotation={[-Math.PI/2,0,0]}
    castShadow>
    <T.MeshNormalMaterial color="white"/> 
    </T.Mesh>
{/if}


