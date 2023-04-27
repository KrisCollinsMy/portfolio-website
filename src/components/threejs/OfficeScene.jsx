import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Icosahedron,
  Html,
} from "@react-three/drei";
import Loader from "./Loader";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Preloader from "../Preloader";
import { gsap } from "gsap";

const CameraZoom = ({ isLoaded }) => {
  const [clicked, setClicked] = useState(false);
  const markerRef = useRef();
  const vec = new THREE.Vector3();

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

  const box = new THREE.BoxGeometry(0.04, 0.04, 0.04);
  const icosahedron = new THREE.IcosahedronGeometry(0.08, 1);

  const vec = new THREE.Vector3();

  const wireframe_mesh_material = new THREE.MeshBasicMaterial({
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
    <group position={[1, -1.1, 1.3]}>
      <mesh ref={cubeRef} geometry={box} material={wireframe_mesh_material} />
      <mesh
        ref={icosahedronRef}
        geometry={icosahedron}
        material={wireframe_mesh_material}
      />
    </group>
  );
};

function planeCurve(g, z) {
  let p = g.parameters;
  let hw = p.width * 0.5;

  let a = new THREE.Vector2(-hw, 0);
  let b = new THREE.Vector2(0, z);
  let c = new THREE.Vector2(hw, 0);

  let ab = new THREE.Vector2().subVectors(a, b);
  let bc = new THREE.Vector2().subVectors(b, c);
  let ac = new THREE.Vector2().subVectors(a, c);

  let r =
    (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

  let center = new THREE.Vector2(0, z - r);
  let baseV = new THREE.Vector2().subVectors(a, center);
  let baseAngle = baseV.angle() - Math.PI * 0.5;
  let arc = baseAngle * 2;

  let uv = g.attributes.uv;
  let pos = g.attributes.position;
  let mainV = new THREE.Vector2();
  for (let i = 0; i < uv.count; i++) {
    let uvRatio = 1 - uv.getX(i);
    let y = pos.getY(i);
    mainV.copy(c).rotateAround(center, arc * uvRatio);
    pos.setXYZ(i, mainV.x, y, -mainV.y);
  }

  pos.needsUpdate = true;
}

const OfficeScene = ({ isLoaded, setisLoaded }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("./3d-models/office/office2.gltf");
  const macbook = useGLTF("./3d-models/macbook/mac-draco.glb");
  const books = useGLTF("./3d-models/books/scene.gltf");
  const cup = useGLTF("./3d-models/cup/scene.gltf");
  const dog_figurine = useGLTF("./3d-models/dog_figurine/scene.gltf");
  const indoor_plant = useGLTF("./3d-models/indoor_plant/scene.gltf");
  console.log(macbook["nodes"]);
  const solid_material = new THREE.MeshBasicMaterial({
    color: "#FFD580",
  });
  const wireframe_mesh_material = new THREE.MeshBasicMaterial({
    color: "#000",
    wireframe: true,
    transparent: true,
    wireframeLinewidth: 1,
  });

  //curved plane
  let params = {
    bendDepth: 0.05,
  };

  let geom = new THREE.PlaneGeometry(0.96, 0.51, 20, 20);
  planeCurve(geom, params.bendDepth);
  let mat = new THREE.MeshBasicMaterial({
    wireframe: true,
    map: new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/uv_grid_opengl.jpg"
    ),
  });
  let o = new THREE.Mesh(geom, mat);

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
        <OrbitControls target={[-261.54, 114.87, 380.84]} />
        <group ref={group} dispose={null}>
          <group position={[0, 0, 0]}>
            <group>
              {/* indoor plant model */}
              <group position={[-310.54, 88.9, 398.84]} scale={8} rotation={[-Math.PI / 2, 0, 0]}>
                <group scale={1.1}>
                <mesh
                    geometry={indoor_plant.nodes.Circle_0.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_0.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_1.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_1.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_2.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_2.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_3.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_3.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_4.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_4.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_5.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={indoor_plant.nodes.Circle_5.geometry}
                    material={wireframe_mesh_material}
                  />
                </group>
              </group>
              {/* cup model */}
              <group position={[-205.54, 89, 398.84]} scale={7}>
                <group rotation={[0, -Math.PI / 2, 0]}>
                  <mesh
                    geometry={cup.nodes.Object_4.geometry}
                    material={cup.materials["Material.001"]}
                  />
                  <mesh
                    geometry={cup.nodes.Object_5.geometry}
                    material={wireframe_mesh_material}
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
                    material={solid_material}
                    scale={[0.96, 1, 0.96]}
                  />
                </group>
              </group>
              <group position={[-22, 0, 0]}>
              {/* books model */}
              <group
                position={[-340.54, 88.9, 398.84]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={12}
              >
                <group position={[0, 0, 0.19]} rotation={[0, -Math.PI / 2, 0]}>
                  <mesh
                    geometry={books.nodes.Cube_0.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_0.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_1.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_1.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_2.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_2.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_3.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_3.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_4.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_4.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_5.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_5.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_6.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={books.nodes.Cube_6.geometry}
                    material={solid_material}
                  />
                </group>
              </group>
              </group>
              {/* macbook model */}
              <group position={[-261.54, 90.87, 380.84]} scale={8}>
                <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
                  <group
                    position={[0, 2.96, -0.13]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      geometry={macbook.nodes.Cube008.geometry}
                      material={solid_material}
                    />
                    <mesh
                      geometry={macbook.nodes.Cube008.geometry}
                      material={wireframe_mesh_material}
                    />
                    <mesh
                      geometry={macbook.nodes.Cube008_1.geometry}
                      material={solid_material}
                    />
                    <mesh
                      geometry={macbook.nodes.Cube008_1.geometry}
                      material={wireframe_mesh_material}
                    />
                    <mesh
                      geometry={macbook.nodes.Cube008_2.geometry}
                      material={solid_material}
                    ><Html
                    className="content"
                    position={[0, 0.04, -0.09]}
                    rotation={[-Math.PI / 2,0,0]}
                    transform
                    distanceFactor={2.5}
                    occlude
                    zIndexRange={[0, 1]}
                    style={{
                      width: "1328px",
                      height: "860px",
                      backgroundColor: "green",
                    }}
                  >
                    <div
                      onPointerDown={(e) => e.stopPropagation()}
                      onWheel={(e) => e.stopPropagation()}
                    >
                      <iframe
            src="https://kriscollinsmy.github.io"
            width="1328px"
            height="860px"
          ></iframe>
                    </div>
                  </Html></mesh>
                  </group>
                </group>
                <mesh
                  geometry={macbook.nodes.keyboard.geometry}
                  material={solid_material}
                  position={[1.79, 0, 3.45]}
                />
                <mesh
                  geometry={macbook.nodes.keyboard.geometry}
                  material={wireframe_mesh_material}
                  position={[1.79, 0, 3.45]}
                />
                <group position={[0, -0.1, 3.39]}>
                  <mesh
                    geometry={macbook.nodes.Cube002.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={macbook.nodes.Cube002.geometry}
                    material={wireframe_mesh_material}
                  />
                  <mesh
                    geometry={macbook.nodes.Cube002_1.geometry}
                    material={solid_material}
                  />
                  <mesh
                    geometry={macbook.nodes.Cube002_1.geometry}
                    material={wireframe_mesh_material}
                  />
                </group>
                <mesh
                  geometry={macbook.nodes.touchbar.geometry}
                  material={solid_material}
                  position={[0, -0.03, 1.2]}
                />
                <mesh
                  geometry={macbook.nodes.touchbar.geometry}
                  material={wireframe_mesh_material}
                  position={[0, -0.03, 1.2]}
                />
              </group>
              <group
                position={[-264.03, 0, 502.34]}
                rotation={[-Math.PI / 2, 0, -Math.PI]}
                scale={100}
              >
                {/* <AnimatedMesh isLoaded={isLoaded} /> */}
                {/* <group
                  position={[-0.02, -1.164, 1.25]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh geometry={geom} material={mat} />
                </group> */}
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
              {/* <mesh
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
              /> */}
              {/* <mesh
                geometry={nodes.Monitor_PlasticBlack_0.geometry}
                material={solid_material}
                position={[-261.54, 88.87, 380.84]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <Html
                  className="content"
                  position={[-261.54, 123.5, 380.84]}
                  transform
                  occlude
                  zIndexRange={[0, 1]}
                  style={{
                    width: "3400px",
                    height: "2200px",
                    backgroundColor: "green",
                  }}
                >
                  <div
                    className="wrapper w-60 h-60"
                    onPointerDown={(e) => e.stopPropagation()}
                    onWheel={(e) => e.stopPropagation()}
                  >
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: "100px",
                        background: "red",
                        width: "2700px",
                        height: "1000px",
                      }}
                    >
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed mollis felis ac eleifend volutpat. Donec eleifend
                        tortor id velit rutrum, ac fringilla elit posuere. Fusce
                        dignissim sapien non ex tempor, vel laoreet sapien
                        bibendum.
                      </p>
                      <p>
                        Phasellus vel pretium neque. Nunc dictum consequat magna
                        a pellentesque. Nullam eget augue ipsum. In mattis augue
                        quis mauris feugiat, sit amet vestibulum felis
                        vestibulum. Etiam laoreet justo vitae sem vulputate
                        dignissim.
                      </p>
                      <p>
                        Maecenas at ligula lorem. Nulla facilisi. Fusce id
                        lobortis magna, quis facilisis nibh. Sed quis nisl eget
                        nibh bibendum euismod. Curabitur placerat justo in
                        imperdiet interdum. Duis vel tellus convallis, ultricies
                        tellus non, rutrum ex.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed mollis felis ac eleifend volutpat. Donec eleifend
                        tortor id velit rutrum, ac fringilla elit posuere. Fusce
                        dignissim sapien non ex tempor, vel laoreet sapien
                        bibendum.
                      </p>
                      <p>
                        Phasellus vel pretium neque. Nunc dictum consequat magna
                        a pellentesque. Nullam eget augue ipsum. In mattis augue
                        quis mauris feugiat, sit amet vestibulum felis
                        vestibulum. Etiam laoreet justo vitae sem vulputate
                        dignissim.
                      </p>
                      <p>
                        Maecenas at ligula lorem. Nulla facilisi. Fusce id
                        lobortis magna, quis facilisis nibh. Sed quis nisl eget
                        nibh bibendum euismod. Curabitur placerat justo in
                        imperdiet interdum. Duis vel tellus convallis, ultricies
                        tellus non, rutrum ex.
                      </p>
                    </div>
                  </div>
                </Html>
              </mesh>
              <mesh
                geometry={nodes.Monitor_PlasticBlack_0.geometry}
                material={wireframe_mesh_material}
                position={[-261.54, 88.87, 380.84]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              /> */}
              {/* <mesh
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
              /> */}
            </group>
          </group>
        </group>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default OfficeScene;
