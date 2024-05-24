<script>
    import { T, useTask } from '@threlte/core'
    import { PlaneGeometry } from 'three'
    export let subtype = "plane";
    let geometry = new PlaneGeometry(15, 15, 33, 33)
    geometry.center()
</script>

<T.Mesh
    {geometry}
    scale={1}
    castShadow
    >
    <T.MeshStandardMaterial color="white"/> 
</T.Mesh>