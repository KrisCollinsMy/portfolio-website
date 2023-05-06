import { useGLTF } from "@react-three/drei";

const IndoorPlant = ({ materials }) => {
  const { nodes } = useGLTF("./3d-models/indoor_plant/scene.gltf");

  return (
    <group
      position={[-310.54, 88.9, 398.84]}
      scale={8}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <group scale={1.1}>
        <mesh
          geometry={nodes.Circle_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_0.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Circle_1.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_1.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Circle_2.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_2.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Circle_3.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_3.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Circle_4.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_4.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Circle_5.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Circle_5.geometry}
          material={materials.wireframe_mesh_material}
        />
      </group>
    </group>
  );
};

export default IndoorPlant;
