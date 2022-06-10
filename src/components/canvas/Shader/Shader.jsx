import { useEffect, useState } from 'react'
import { FirstRenderBuildPuzzle, SecondRenderBuildPuzzle, ThirdRenderBuildPuzzle } from "../../puzzleMaker/functions";
import { useFBX } from '@react-three/drei'

const Shader = (props) => {
  const [positions, setPositions] = useState([]);
  const [stage, setStage] = useState(0);

  const [xInteger, setXInteger] = useState(5);
  const [yInteger, setYInteger] = useState(5);

  useEffect(() => {
    if (stage === 0) {
      console.log('stage 1, I am just building the array')
      setPositions(FirstRenderBuildPuzzle(xInteger, yInteger));
      setStage(1);
    } else if (stage === 1) {
      console.log('stage 2, I am adding colors to the array for the user')
      let copied_positions = positions;
      let new_positions = SecondRenderBuildPuzzle(xInteger, yInteger, copied_positions);
      setPositions([...new_positions])
      setStage(2);
    } else if (stage === 2) {
      console.log('stage 3, I am calculating the meshes, I am not built yet')
      let copied_positions = positions;
      let new_positions = ThirdRenderBuildPuzzle(xInteger, yInteger, copied_positions);
      setPositions([...new_positions])
      setStage(3);
    }
  }, [stage]);

  return (
    positions.map(({ x, y, material, mesh, first_render }, index) => {

      if (mesh && mesh != null ) {
        const fbx = useFBX(mesh.mesh_url)
        // cloning the fbx cause three js uses a reference on useFBX
        let fbxClone = fbx.clone();

        return <primitive object={fbxClone} key={index} position={[x, 1, y]} />
      }

      return (
        <mesh
          position={[x, 1, y]}
          key={index}
        >
          <boxBufferGeometry args={[1, 1, 1]} />
          {first_render == "corner" &&
            <meshBasicMaterial
              attach="material"
              color="black"
              transparent
            />
          }
          {first_render == "edge" &&
            <meshBasicMaterial
              attach="material"
              color="blue"
              transparent
            />
          }
          {first_render == "between" &&
            <meshBasicMaterial
              attach="material"
              color="red"
              transparent
            />
          }
          <instancedMesh />
        </mesh>
      )
    })

  )
}

export default Shader
