import { useGLTF } from "@react-three/drei";

const Office = ({materials}) => {
    const { nodes } = useGLTF("./3d-models/office/office2.gltf");

    return ( <><group
        position={[-264.03, 0, 480.34]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={100}
      >
        {/* <AnimatedMesh isLoaded={isLoaded} /> */}
        {/* <group
          position={[-0.02, -1.164, 1.25]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <mesh geometry={geom} material={materials.mat} />
        </group> */}
        <mesh
          geometry={nodes.Chair1_FabricGrey_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Chair1_FabricGrey_0.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Chair1_Wood_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Chair1_Wood_0.geometry}
          material={materials.wireframe_mesh_material}
        />
      </group>
      <group
        position={[-264.03, 0, 402.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          geometry={nodes.Desk_PaintWhite_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Desk_PaintWhite_0.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Desk_SteelBlack_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Desk_SteelBlack_0.geometry}
          material={materials.wireframe_mesh_material}
        />
      </group>
      <group
        position={[-274.72, 238.68, 419.25]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <mesh
          geometry={nodes.Light2_LightsYellow_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Light2_LightsYellow_0.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Light2_SteelBlack_0.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Light2_SteelBlack_0.geometry}
          material={materials.wireframe_mesh_material}
        />
      </group></>);
}
 
export default Office;