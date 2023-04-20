import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Icosahedron,
} from "@react-three/drei";
import Loader from "./Loader";
import { useRef, useState, Suspense } from "react";
import {
  BoxGeometry,
  IcosahedronGeometry,
  MeshBasicMaterial,
  Vector3,
} from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Preloader from "../Preloader";
import { gsap } from "gsap";

const CameraZoom = ({ isLoaded }) => {
  const [clicked, setClicked] = useState(false);
  const markerRef = useRef();
  const vec = new Vector3();

  let counter = 0;
  useFrame((state) => {
    // if (isLoaded) {
    //   state.camera.lookAt(-600.54, 120.87, -80.84);
    //   //state.camera.lookAt(-261.54, 108.87, 380.84);
    //   //state.camera.position.lerp(vec.set(-300.12, 150.87, 490.64), 0.009);
    //   state.camera.position.lerp(vec.set(-150.12, 155.87, 570.64), 0.02);
    //   state.camera.updateProjectionMatrix();
    // }

    // if (loadedModel) {
    //   //sceneSetup.current.camera.position.x += 1;
    //   //sceneSetup.current.camera.position.z -= 1;
    //   //sceneSetup.current.camera.position.y -= 1;
    //   cubeObject.rotation.x -= 0.002;
    //   cubeObject.rotation.y += 0.003;

    //   icosahedronObject.rotation.x -= 0.001;
    //   icosahedronObject.rotation.y += 0.002;

    //   //animation to move vertically
    //   if (counter <= 100) {
    //     icosahedronObject.position.y -= 0.2;
    //     cubeObject.position.y -= 0.2;
    //     counter++;
    //   }

    //   if (counter > 100) {
    //     icosahedronObject.position.y += 0.2;
    //     cubeObject.position.y += 0.2;
    //     counter++;
    //   }

    //   if (counter > 200) {
    //     counter = 0;
    //   }
    // }

    return null;
  });
  return (
    // <mesh ref={markerRef} onClick={() => setClicked(!clicked)}>
    //   <coneBufferGeometry attach="geometry" args={[1, 5, 20]} />
    //   <meshLambertMaterial attach="material" color="red" />
    // </mesh>
    <></>
  );
};

const AnimatedMesh = ({ isLoaded, setisLoaded }) => {
  const cubeRef = useRef();
  const icosahedronRef = useRef();

  const box = new BoxGeometry(0.04, 0.04, 0.04);
  const icosahedron = new IcosahedronGeometry(0.08, 1);

  const vec = new Vector3();

  const wireframe_mesh_material = new MeshBasicMaterial({
    color: "#000",
    wireframe: true,
    transparent: true,
    wireframeLinewidth: 1,
  });

  let counter = 0;

  // Define the animation function
  const animate = (time) => {
    cubeRef.current.rotation.x -= 0.002;
    cubeRef.current.rotation.y += 0.003;

    icosahedronRef.current.rotation.x -= 0.001;
    icosahedronRef.current.rotation.y += 0.002;

    //animation to move vertically
    if (counter <= 100) {
      icosahedronRef.current.position.z -= 0.002;
      cubeRef.current.position.z -= 0.002;
      counter++;
    }

    if (counter >= 100) {
      icosahedronRef.current.position.z += 0.002;
      cubeRef.current.position.z += 0.002;
      counter++;
    }

    if (counter > 200) {
      counter = 0;
    }
  };

  // Use the useFrame hook to call the animation function on each frame
  useFrame((state, delta) => {
    animate(state.clock.elapsedTime);

    if (isLoaded) {
      // state.camera.lookAt(-600.54, 120.87, -80.84);
      // //state.camera.lookAt(-261.54, 108.87, 380.84);
      // //state.camera.position.lerp(vec.set(-300.12, 150.87, 490.64), 0.009);
      // state.camera.position.lerp(vec.set(-150.12, 155.87, 570.64), 0.02);
      // state.camera.updateProjectionMatrix();
      // x: -160.12,
      //   y: 150.87,
      //   z: 580.64,
      gsap.to(state.camera.position, {
        duration: 7,
        ease: "power3",
        x: -160.12,
        y: 150.87,
        z: 580.64,
        onComplete: function () {
          console.log("scene is done loading");
         
        },
      });

      state.camera.lookAt(-271.54, 150.87, 380.84);
    }
  });

  return (
    <group position={[-0.8, -1.1, 1.3]}>
      <mesh ref={cubeRef} geometry={box} material={wireframe_mesh_material} />
      <mesh
        ref={icosahedronRef}
        geometry={icosahedron}
        material={wireframe_mesh_material}
      />
    </group>
  );
};

const OfficeScene = ({ isLoaded, setisLoaded }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("./3d-models/office/office2.gltf");
  const solid_material = new MeshBasicMaterial({
    color: "#FFD580",
  });
  const wireframe_mesh_material = new MeshBasicMaterial({
    color: "#000",
    wireframe: true,
    transparent: true,
    wireframeLinewidth: 1,
  });

  return (
    <Canvas
      flat
      camera={{
        position: [-200, 200, 1100],
        fov: 45,
        near: 0.1,
        far: 2000,
      }}
      style={{
        position: "fixed",
        background: "#FFD580",
        visibility: isLoaded ? "visible" : "hidden",
      }}
      onCreated={() => {
        setisLoaded(true);
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls target={[-261.54, 125.87, 380.84]} />
        <group ref={group} dispose={null}>
          <group position={[0, 0, 0]}>
            <group>
              <group
                position={[-264.03, 0, 502.34]}
                rotation={[-Math.PI / 2, 0, -Math.PI]}
                scale={100}
              >
                <AnimatedMesh isLoaded={isLoaded} />
                <mesh
                  geometry={nodes.Chair1_FabricGrey_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Chair1_FabricGrey_0.geometry}
                  material={wireframe_mesh_material}
                />
                <mesh
                  geometry={nodes.Chair1_Wood_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Chair1_Wood_0.geometry}
                  material={wireframe_mesh_material}
                />
              </group>
              <group
                position={[-264.03, 0, 402.2]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <mesh
                  geometry={nodes.Desk_PaintWhite_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Desk_PaintWhite_0.geometry}
                  material={wireframe_mesh_material}
                />
                <mesh
                  geometry={nodes.Desk_SteelBlack_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Desk_SteelBlack_0.geometry}
                  material={wireframe_mesh_material}
                />
              </group>
              <group
                position={[-349.96, 88.87, 387.29]}
                rotation={[-Math.PI / 2, 0, 0.55]}
                scale={100}
              >
                <mesh
                  geometry={nodes.Lamp1_LightsWhite_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Lamp1_LightsWhite_0.geometry}
                  material={wireframe_mesh_material}
                />
                <mesh
                  geometry={nodes.Lamp1_SteelBlack_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Lamp1_SteelBlack_0.geometry}
                  material={wireframe_mesh_material}
                />
              </group>
              <group
                position={[-274.72, 268.68, 419.25]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <mesh
                  geometry={nodes.Light2_LightsYellow_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Light2_LightsYellow_0.geometry}
                  material={wireframe_mesh_material}
                />
                <mesh
                  geometry={nodes.Light2_SteelBlack_0.geometry}
                  material={solid_material}
                />
                <mesh
                  geometry={nodes.Light2_SteelBlack_0.geometry}
                  material={wireframe_mesh_material}
                />
              </group>
              <mesh
                geometry={nodes.Keyboard_Keyboard_0.geometry}
                material={solid_material}
                position={[-262.12, 88.87, 407.64]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                geometry={nodes.Keyboard_Keyboard_0.geometry}
                material={wireframe_mesh_material}
                position={[-262.12, 88.87, 407.64]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                geometry={nodes.Monitor_PlasticBlack_0.geometry}
                material={solid_material}
                position={[-261.54, 88.87, 380.84]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                geometry={nodes.Monitor_PlasticBlack_0.geometry}
                material={wireframe_mesh_material}
                position={[-261.54, 88.87, 380.84]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                geometry={nodes.Mouse_PlasticBlack_0.geometry}
                material={solid_material}
                position={[-216.12, 88.87, 413.47]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                geometry={nodes.Mouse_PlasticBlack_0.geometry}
                material={wireframe_mesh_material}
                position={[-216.12, 88.87, 413.47]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
            </group>
          </group>
        </group>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default OfficeScene;
