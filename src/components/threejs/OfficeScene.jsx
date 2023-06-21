import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Loader from "./Loader";
import { useRef, useState, Suspense } from "react";
import { MeshBasicMaterial } from "three";
import { gsap } from "gsap";
import Books from "./objects/Books";
import Cup from "./objects/Cup";
import Macbook from "./objects/Macbook";
import Office from "./objects/Office";
import ErrorBoundary from "../ErrorBoundary";

const CameraZoom = ({ isLoaded, setshowHtml, onClicked }) => {
  const { camera } = useThree();

  if (isLoaded) {
    gsap.to(camera.position, {
      duration: 4,
      ease: "power3",
      x: -160.12,
      y: 190.87,
      z: 560.64,
      onComplete: function () {
        setshowHtml(true);
      },
    });

    camera.lookAt(-271.54, 150.87, 380.84);

    if (onClicked) {
      gsap.to(camera.position, {
        duration: 4,
        ease: "power3",
        x: -261.54,
        y: 120.87,
        z: 450.84,
      });
    }
  }
};

const OfficeScene = ({ isLoaded, setisLoaded, onClicked, setOnClicked }) => {
  const group = useRef();
  const [showHtml, setshowHtml] = useState(false);

  const solid_material = new MeshBasicMaterial({
    color: "#FFD580",
  });
  const wireframe_mesh_material = new MeshBasicMaterial({
    color: "#000",
    wireframe: true,
    transparent: true,
    wireframeLinewidth: 1,
  });
  const materials = { solid_material, wireframe_mesh_material };

  return (
    <ErrorBoundary>
      <Canvas
        flat
        dpr={window.devicePixelRatio * 0.8}
        camera={{
          position: [-200, 200, 1100],
          fov: 45,
          near: 0.1,
          far: 400,
        }}
        style={{
          position: "fixed",
          background: "#FFD580",
          visibility: isLoaded ? "visible" : "hidden",
        }}
      >
        <Suspense fallback={<Loader setisLoaded={setisLoaded} />}>
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
            target={[-261.54, 114.87, 380.84]}
          />
          <group ref={group}>
            <CameraZoom
              isLoaded={isLoaded}
              setshowHtml={setshowHtml}
              onClicked={onClicked}
              setOnClicked={setOnClicked}
            />
            <Cup materials={materials} />
            <Books materials={materials} />
            <Macbook materials={materials} showHtml={showHtml} />
            <Office materials={materials} />
          </group>
        </Suspense>
        {/* <Stats /> */}
      </Canvas>
    </ErrorBoundary>
  );
};

export default OfficeScene;
