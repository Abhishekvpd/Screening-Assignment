"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import InputField from "~/components/InputField";

export default function LoginPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const loginInputs = [
    {
      id: 2,
      label: "Email",
      placeholder: "Enter email",
      type: "email",
      errorMessage: "Enter a valid email address",
      name: "email",
      value: formValues.email,
    },
    {
      id: 3,
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      errorMessage:
        "The password should be at least 8 characters long, should contain at least one uppercase letter, one lowercase letter, one number and one special character",
      // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      pattern: "john",
      name: "password",
      value: formValues.password,
    },
  ];

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formValues);
    router.push("/interests");
  }
  
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="header-2">Login</h2>
      <div className="mt-1 flex flex-col items-center gap-3">
        <h3 className="header-3">Welcome back to ECOMMERCE</h3>
        <span>The next gen business marketplace</span>
      </div>
      <form className="flex flex-col gap-8" onSubmit={formSubmitHandler}>
        {loginInputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            onChangeHandler={onChangeHandler}
          />
        ))}
        <button type="submit" className="button-primary">
          LOGIN
        </button>
      </form>
      <div className="-m-1 h-[1px] w-full bg-[#c1c1c1]"></div>
      <div>
        <span>Don’t have an Account?</span>
        <button
          className="px-3 font-medium"
          onClick={() => router.push("/signup")}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
