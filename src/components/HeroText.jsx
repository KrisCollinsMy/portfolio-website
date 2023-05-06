import Typewriter from "typewriter-effect";

const HeroText = ({onClicked, setOnClicked}) => {
  
  return (
    
    <div
      className="z-50 text-xl fixed top-1/4 left-1/3 font-mono tracking-[2px] whitespace-nowrap text-center overflow-hidden"
      id="hero-text"
    >
      {onClicked ? '' : (
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
      />)}
    </div>
  );
};

export default HeroText;
