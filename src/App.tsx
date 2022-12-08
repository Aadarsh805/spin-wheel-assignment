import { useEffect, useState } from "react";
import { z } from "zod";
import Form from "./components/Form";
import Spinwheel from "./components/Spinwheel";
import Wheel from "./assets/wheel.png";
import Coupon from "./components/Coupon";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [won, setWon] = useState(false);
  const [prize, setPrize] = useState<string>("");

  return (
    <div className="h-screen max-h-screen xl:bg-[url(src/assets/bg-desktop-top.png),_url(src/assets/bg-desktop-bottom.png)] md:bg-[url(src/assets/bg-tab-top.png),_url(src/assets/bg-tab-bottom.png)] bg-[url(src/assets/bg-mobile-top.png),_url(src/assets/bg-mobile-bottom.png)] bg-contain bg-[position:top,bottom] bg-no-repeat bg-primary overflow-hidden flex justify-center items-center">
      {isLoading ? (
        <h1 className="text-8xl text-blue-400 font-bold">loading....</h1>
      ) : (
        <div
          className={`flex justify-center items-center md:gap-40 md:flex-row flex-col h-full ${
            !isAllowed && "md:mr-80"
          } ${won && "md:mr-80"} mr-0 xl:mr-0`}
        >
          {!isAllowed && !won ? (
            <div>
              <img
                src={Wheel}
                alt="wheel"
                className="xl:w-96 w-96 md:w-[40rem]"
              />
            </div>
          ) : (
            <Spinwheel setWon={setWon} won={won} setPrize={setPrize} />
          )}
          {!isAllowed ? (
            <Form
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsAllowed={setIsAllowed}
            />
          ) : (
            won && <Coupon prize={prize} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
