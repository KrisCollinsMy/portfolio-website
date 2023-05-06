import { useGLTF } from "@react-three/drei";

const Cup = ({ materials }) => {
  const cup = useGLTF("./3d-models/cup/scene.gltf");

  return (
    <group position={[-210.54, 92, 398.84]} scale={7}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh
          geometry={cup.nodes.Object_4.geometry}
          material={cup.materials["Material.001"]}
        />
        <mesh
          geometry={cup.nodes.Object_5.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={cup.nodes.Object_6.geometry}
          material={cup.materials.PacmanMaze}
        />
        <mesh
          geometry={cup.nodes.Object_7.geometry}
          material={cup.materials.Dishwasher}
        />
        <mesh
          geometry={cup.nodes.Object_8.geometry}
          material={cup.materials.Bottom}
        />
        <mesh
          geometry={cup.nodes.Object_10.geometry}
          material={materials.solid_material}
          scale={[0.96, 1, 0.96]}
        />
      </group>
    </group>
  );
};

export default Cup;
