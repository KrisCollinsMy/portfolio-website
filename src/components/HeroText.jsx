import Typewriter from "typewriter-effect";

const HeroText = ({onClicked, setOnClicked}) => {
  
  return (<>
    {onClicked ? null : (
    <div
      className="z-50 absolute md:-translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 m-auto sm:text-sm md:text-xl lg:text-xl top-1/4 sm:left-0 md:left-1/2 lg:left-1/2 font-mono tracking-[2px]  text-center overflow-hidden bg-black text-[#FFD580] font-bold p-1"
      id="hero-text"
    >
      
      <Typewriter
        options={{
          autoStart: true,
          loop: false,
          delay: 50,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(
              "Hi, I’m Kris Collins. I am a front-end developer. <br> <button id='viewMyWorkButton' type='button'>View my work</button>"
            )
            .callFunction(() => {
              const button = document.getElementById("viewMyWorkButton");
              button.addEventListener("click", function () {
                setOnClicked(true);
              });
            })
            .start();
        }}
      />
    </div>)}
    </>
  );
};

export default HeroText;
