"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

let currentIndex: number = 0;
const VerifyScreen = ({ email }: { email: string }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const [currentOtpIndex, setCurrentOtpIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestOtp = otp.join("");

  const atIndex = email.indexOf("@");
  const visibleEmail = `${email.slice(0, 3)}${email.slice(3, atIndex).replace(/./g, "*")}${email.slice(atIndex)}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const newOtp: string[] = [...otp];
    newOtp[currentIndex] = value.substring(value.length - 1);

    if (!value) setCurrentOtpIndex(currentIndex - 1);
    else setCurrentOtpIndex(currentIndex + 1);

    setOtp(newOtp);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e;
    currentIndex = index;
    if (key === "Backspace") setCurrentOtpIndex(currentIndex - 1);
  };

  const verifyHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyEmail", {
        email,
        otp: requestOtp,
      });
      if (response.data?.success) router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentOtpIndex]);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="header-2 text-center">Verify your email</h2>
      <div className="flex flex-col text-center">
        <span>Enter the 8 digit code you have received on</span>
        <span className="font-medium">{visibleEmail}</span>
      </div>
      <section className="mt-3 flex flex-col">
        <label className="mb-1">Code</label>
        <div className="flex gap-3">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={index === currentOtpIndex ? inputRef : null}
              type="number"
              className="spin-button-none h-12 w-[46px] rounded-md border border-solid border-[#C1C1C1] text-center text-lg font-medium text-gray-400 outline-none transition focus:border-gray-700 focus:text-gray-700"
              onChange={handleChange}
              value={otp[index]}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
      </section>
      <button
        className="button-primary mt-8"
        onClick={verifyHandler}
        disabled={requestOtp.length < 8 || loading}
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyScreen;
