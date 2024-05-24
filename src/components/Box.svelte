<script>
    import { T } from '@threlte/core'
    import { BoxGeometry } from 'three'
</script>

<T.Mesh
rotation={[0,0,0]}
position.y={1}
scale={1}>
  <T.BoxGeometry args={[8, 8, 8, 10,10,10]} />
  <T.MeshStandardMaterial color="white"/> 
</T.Mesh>