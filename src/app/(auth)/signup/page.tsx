"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import InputField from "~/components/InputField";
import VerifyScreen from "./VerifyScreen";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formSubmission, setFormSubmission] = useState(false);
  const [formValues, setFormValues] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
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
      name: "username",
      value: formValues.username,
    },
    {
      id: 2,
      label: "Email",
      placeholder: "Enter email",
      type: "email",
      errorMessage: "Enter a valid email address",
      name: "email",
      value: formValues.email,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
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

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", formValues);
      setFormSubmission(true);
    } catch (error: any) {
      toast.error(error.response.data.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return formSubmission ? (
    <VerifyScreen email={formValues.email} />
  ) : (
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
        <button type="submit" className="button-primary" disabled={loading}>
          CREATE ACCOUNT
        </button>
      </form>
      <div className="mt-4">
        <span>Don’t have an Account?</span>
        <button className="button-secondary" onClick={() => router.push("/")}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
