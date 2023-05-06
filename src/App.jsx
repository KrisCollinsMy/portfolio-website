import { useState } from "react";
import "./App.css";
import OfficeScene from "./components/threejs/OfficeScene";
import Preloader from "./components/Preloader";
import Typewriter from "typewriter-effect";
import HeroText from "./components/HeroText";

function App() {
  const [isLoaded, setisLoaded] = useState(false);
  const [onClicked, setOnClicked] = useState(false);

  return (
    <>
      <div className="w-screen h-screen">
        {isLoaded ? <HeroText onClicked={onClicked} setOnClicked={setOnClicked} />: <Preloader />}
        <OfficeScene isLoaded={isLoaded} setisLoaded={setisLoaded} onClicked={onClicked} setOnClicked={setOnClicked} />
      </div>
    </>
  );
}

export default App;
