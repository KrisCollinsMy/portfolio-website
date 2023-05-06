import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";

const Macbook = ({ materials, showHtml }) => {
  const { nodes } = useGLTF("./3d-models/macbook/mac-draco.glb");
  return (
    <group position={[-261.54, 90.87, 380.84]} scale={8}>
      <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Cube008.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube008.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube008_1.geometry}
            material={materials.solid_material}
          />
          <mesh
            geometry={nodes.Cube008_1.geometry}
            material={materials.wireframe_mesh_material}
          />
          <mesh
            geometry={nodes.Cube008_2.geometry}
            material={materials.solid_material}
          >
            {showHtml ? (
              <Html
                className="content"
                position={[0, 0.04, -0.09]}
                rotation={[-Math.PI / 2, 0, 0]}
                transform
                distanceFactor={2.5}
                occlude
                zIndexRange={[0, 1]}
                style={{
                  width: "1328px",
                  height: "860px",
                }}
              >
                <div
                  onPointerDown={(e) => e.stopPropagation()}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <iframe
                    src="https://kriscollinsmy.github.io/"
                    width="1328px"
                    height="860px"
                  ></iframe>
                </div>
              </Html>
            ) : null}
          </mesh>
        </group>
      </group>
      <mesh
        geometry={nodes.keyboard.geometry}
        material={materials.solid_material}
        position={[1.79, 0, 3.45]}
      />
      <mesh
        geometry={nodes.keyboard.geometry}
        material={materials.wireframe_mesh_material}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={materials.wireframe_mesh_material}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials.solid_material}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={materials.wireframe_mesh_material}
        />
      </group>
      <mesh
        geometry={nodes.touchbar.geometry}
        material={materials.solid_material}
        position={[0, -0.03, 1.2]}
      />
      <mesh
        geometry={nodes.touchbar.geometry}
        material={materials.wireframe_mesh_material}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
};

export default Macbook;
