import { useState } from "react";
import "./App.css";
import OfficeScene from "./components/threejs/OfficeScene";
import Preloader from "./components/Preloader";
import HeroText from "./components/HeroText";

function App() {
  const [isLoaded, setisLoaded] = useState(false);
  const [onClicked, setOnClicked] = useState(false);

  return (
    <>
      <div className="w-screen h-screen">
        {onClicked ? (
          <button
            onClick={() => setOnClicked(false)}
            className="z-50 p-1 bg-black text-[#FFD580] sm:text-[2rem] md:text-[2rem] lg:text-[3rem] fixed top-10 right-10 font-mono tracking-[2px] whitespace-nowrap text-center"
          >
            Back
          </button>
        ) : null}
        {isLoaded ? (
          <HeroText onClicked={onClicked} setOnClicked={setOnClicked} />
        ) : (
          <Preloader />
        )}
        <OfficeScene
          isLoaded={isLoaded}
          setisLoaded={setisLoaded}
          onClicked={onClicked}
          setOnClicked={setOnClicked}
        />
      </div>
    </>
  );
}

export default App;
