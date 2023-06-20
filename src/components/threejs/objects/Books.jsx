import { useGLTF } from "@react-three/drei";

const Books = ({ materials }) => {
  const { nodes } = useGLTF("./3d-models/books/scene.gltf");

  return (
    <group position={[-22, 0, 0]}>
      <group
        position={[-320.54, 88.9, 398.84]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={12}
      >
        <group position={[0, 0, 0.19]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh
            geometry={nodes.Cube_0.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_0.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_2.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_2.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_3.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_3.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_4.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_4.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_5.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_5.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube_6.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube_6.geometry}
            material={materials.solid_material}
          />
        </group>
      </group>
    </group>
  );
};

export default Books;
