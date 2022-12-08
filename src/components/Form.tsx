import React, { useState, FC } from "react";
import { z } from "zod";
import { CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";

type FormProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setIsAllowed: (value: boolean) => void;
};

const Form: FC<FormProps> = ({ isLoading, setIsLoading, setIsAllowed }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>();
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && phone) {
      onSubmit(email);
      return;
    }
    if (!email) {
      alert("Please enter an email");
      return;
    }
    if (!checked) {
      alert("agree to terms");
      return;
    }
    alert("Please enter the phone number");
  };

  const onSubmit = async (email: string) => {
    setIsLoading(true);
    const emailSchema = z.string().email();
    const phoneSchema = z.number();

    try {
      emailSchema.parse(email);
      phoneSchema.parse(phone);
      setTimeout(() => {
        setIsAllowed(true);
      }, 200);
    } catch (error) {
      setIsLoading(false);
      alert(error);
      return;
    }

    // make a mock API call with the user's email

    // const response = await fetch("https://spinwheel/users", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    // });

    // if (response.status === 200) {
    //   navigate("/spin");
    // } else {
    //   alert("An error occurred, Please try again later.");
    // }
  };

  return (
    <div className="w-[26rem] md:w-[40rem]">
      <form onSubmit={handleSubmit}>
        <h2 className="text-4xl font-semibold mb-8">
          This is how EngageBud <br /> looks like in action!
        </h2>

        <div className="w-full bg-white flex gap-4 items-center lg:p-3 p-2 rounded shadow-lg mb-4">
          <CiMail className="text-2xl text-black" />
          <div className="flex flex-col flex-1">
            <p className="text-xs text-gray-[#49454F]">Email</p>
            <input
              type="email"
              placeholder="joe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none outline-none m-0 p-0 py-1"
            />
          </div>
        </div>
        <div className="w-full bg-white flex gap-4 items-center lg:p-3 p-2 rounded shadow-lg mb-6">
          <BsTelephone className="text-2xl text-black" />
          <div className="flex flex-col flex-1">
            <p className="text-xs text-gray-[#49454F]">Phone number</p>
            <input
              type="number"
              placeholder="+91 98256 XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.valueAsNumber)}
              className="border-none outline-none m-0 p-0 py-1"
            />
          </div>
        </div>

        <div className="w-full border-[1px] border-black flex gap-4 items-center p-3 rounded shadow-lg mb-4">
          <input
            type="checkbox"
            className="border-none outline-none w-6 h-6 bg-black"
            checked={checked}
            onChange={() => setChecked((prev: boolean) => !prev)}
          />
          <span className="text-xs">
            I agree to receiving recurring automated messages at the number I
            have provided. Consent is not a condition to purchase.
          </span>
        </div>
        <button
          type="submit"
          className="font-bold text-white text-2xl bg-[#146531] w-full rounded-full p-4"
        >
          Try your luck
        </button>
      </form>
      <span className="text-[.6rem] mt-2 opacity-80">
        *You can spin the wheel only once! *If you win, you can claim your
        coupon for 10 minutes only!
      </span>

      <button
        className="flex gap-2 w-full"
        onClick={() => alert("go back to home page")}
      >
        <p className="text-md font-semibold text-end w-full">
          No, i don't feel lucky
        </p>
        <span className="text-lg">X </span>
      </button>
    </div>
  );
};

export default Form;
