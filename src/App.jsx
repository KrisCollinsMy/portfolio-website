import { useState } from "react";
import "./App.css";
import { OfficeScene, Preloader } from "./components";
import Typewriter from "typewriter-effect";

const HeroText = () => {
  return (
    <div
      className="z-50 text-lg fixed top-1/4 left-1/3 font-mono tracking-[2px] whitespace-nowrap text-center overflow-hidden"
      id="hero-text"
    >
      <Typewriter
        options={{
          autoStart: true,
          loop: false,
          delay: 50
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(
              "Hi, I’m Kris Collins. I am a graphic designer, <br> UI/UX designer & front-end developer. <br> <button style='font-weight:bold; text-decoration:underline; font-size:1.4rem;'>View my work</button>"
            )
            .start();
        }}
      />
    </div>
  );
};

function App() {
  const [isLoaded, setisLoaded] = useState(false);

  return (
    <>
      <div className="w-screen h-screen">
        {isLoaded ? null : <Preloader />}
        <HeroText />
        <OfficeScene isLoaded={isLoaded} setisLoaded={setisLoaded} />
      </div>
    </>
  );
}

export default App;
