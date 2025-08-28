import { useNavigate } from "react-router-dom";
import { Buttons } from "./components/Buttons";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Blurred Background */}
      <img
        src="/bg.jpeg"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="/logo2.png"
          alt="logo"
          className="w-24 sm:w-32 md:w-40 h-auto"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end z-10 p-6 md:p-12">
        {/* Text */}
        <div className="text-center md:text-right max-w-md">
          <p className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-snug">
            Play chess
            <br /> Improve your game
            <br /> Have fun !
          </p>

          {/* Button */}
          <div className="pt-6">
            <Buttons
              onClick={() => {
                // socket.send(
                //   JSON.stringify({
                //     type: INIT_GAME,
                //   })
                // );
                navigate("/game");
              }}
            >
              JOIN NOW
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};
