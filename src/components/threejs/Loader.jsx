import { Html, useProgress } from "@react-three/drei";

const Loader = ({setisLoaded}) => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(0)}%
        {progress.toFixed(0) == '100' ? setisLoaded(true) : null}
      </p>
    </Html>
  );
};

export default Loader;
