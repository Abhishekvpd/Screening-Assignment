"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "~/components/InputField";

export default function SignupPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const signUpInputs = [
    {
      id: 1,
      label: "Name",
      placeholder: "Enter name",
      type: "text",
      errorMessage: "This is a required field",
      name: "name",
      value: formValues.name,
    },
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
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="header-2">Create your account</h2>
      <form className="flex flex-col gap-8" onSubmit={formSubmitHandler}>
        {signUpInputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            onChangeHandler={onChangeHandler}
          />
        ))}
        <button type="submit" className="button-primary">
          CREATE ACCOUNT
        </button>
      </form>
      <div className="mt-4">
        <span>Don’t have an Account?</span>
        <button
          className="button-secondary"
          onClick={() => router.push("/")}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
