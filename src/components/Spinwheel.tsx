import React, { FC, useRef, useEffect, useState } from "react";
import pointer from "../assets/pointer.png";
import gif from "../assets/gif.gif";

type SpinwheelProps = {
  setWon: (value: boolean) => void;
  won: boolean;
  setPrize: (value: string) => void;
};

const Spinwheel: FC<SpinwheelProps> = ({ setWon, won, setPrize }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [showGif, setShowGif] = useState(false);

  const partitions = [1, 2, 3, 4, 5, 6];

  const handleSpin = () => {
    if (won) return;
    let number = 6;
    let rotate = 0;

    if (number === 1) {
      rotate = 3600 + 0;
      setPrize("10000");
    }
    if (number === 2) {
      rotate = 3600 + 300;
      setPrize("20000");
    }
    if (number === 3) {
      rotate = 3600 + 120;
      setPrize("50000");
    }
    if (number === 4) {
      rotate = 3600 + 180;
      setPrize("40000");
    }
    if (number === 5) {
      rotate = 3600 + 240;
      setPrize("30000");
    }
    if (number === 6) {
      rotate = 3600 + 60;
      setPrize("60000");
    }

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${rotate}deg)`;
    }

    setTimeout(() => {
      setWon(true);
      setShowGif(true);
    }, 2000);

    setTimeout(() => {
      setShowGif(false);
    }, 6000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-[350px] h-[350px]">
        <div className="absolute top-[50%] z-50 left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          <img src={pointer} alt="pointer" className="w-12" />
        </div>
        <div
          ref={wheelRef}
          onClick={handleSpin}
          className={`cursor-pointer w-full h-full relative rounded-full bg-red-200 border-8 border-[#ECBA3F] overflow-hidden wheel`}
        >
          {partitions.map((partition) => (
            <div
              key={partition}
              className={`partition flex items-center justify-center absolute w-[200px] h-[50%]  partition-${partition}`}
            >
              {partition}0,000
            </div>
          ))}
        </div>
      </div>

      {!won && (
        <button
          className="bg-[#146531] w-40 p-4 font-extrabold text-2xl uppercase tracking-wider hover:opacity-90 text-white rounded-full outline-none border-none"
          onClick={handleSpin}
        >
          Spin
        </button>
      )}

      {showGif && (
        <img
          src={gif}
          className="absolute bottom-0 xl:w-[50%] w-full left-[50%] -translate-x-[50%]"
        />
      )}
    </div>
  );
};

export default Spinwheel;
