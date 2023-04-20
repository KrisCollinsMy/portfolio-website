import { useState } from "react";
import "./App.css";
import { OfficeScene, Preloader } from "./components";

function App() {
  const [isLoaded, setisLoaded] = useState(false);

  return (
    <>
      <div className="w-screen h-screen">
        {isLoaded ? null : <Preloader />}
        <OfficeScene isLoaded={isLoaded} setisLoaded={setisLoaded} />
      </div>
    </>
  );
}

export default App;
