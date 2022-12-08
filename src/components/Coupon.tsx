import React, { useState } from "react";
import copy from "copy-to-clipboard";

type CouponProps = {
  prize: string;
};

const Coupon = ({ prize }: CouponProps) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  const generateRandomCode = () => {
    for (let i = 0; i < 8; i++) {
      randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return randomCode;
  };
  const [code, setCode] = useState(generateRandomCode());
  const [showText, setShowText] = useState(false);

  generateRandomCode();
  return (
    <div className="w-[26rem] flex flex-col gap-3">
      <p className="text-2xl font-semibold text-center">Congrats! you won:</p>
      <span className="text-4xl font-bold text-center">${prize}</span>

      <div className="w-full flex p-4">
        <p className="p-2 bg-[#14141433] uppercase font-bold text-4xl text-white flex-1">
          {code}
        </p>

        <button
          type="button"
          onClick={() => {
            copy(code);
            setShowText(true);
            setTimeout(() => {
              setShowText(false);
            }, 1000);
          }}
          className="p-2 font-extrabold cursor-pointer text-white text-xl uppercase bg-[#146531]"
        >
          Copy
        </button>
      </div>
      <p className="text-xs opacity-80 text-center">
        *You can claim your coupon for 10 minutes only!
      </p>
      {showText && (
        <p className="text-md text-red-700 text-center">Copied to Clipboard!</p>
      )}
    </div>
  );
};

export default Coupon;
