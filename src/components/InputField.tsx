import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { InputProps } from "~/utils/models";

function InputField({
  label,
  errorMessage,
  type,
  placeholder,
  pattern,
  name,
  value,
  onChangeHandler,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  //   to toggle show and hide password
  const passwordVisibilityHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex w-[456px] flex-col">
      <label className="text-base font-normal">{label}</label>
      <input
        placeholder={placeholder}
        className="border-primary rounded-md px-4 py-3 outline-none"
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        value={value}
        // pattern={pattern ? pattern : undefined}
        onChange={(e) => onChangeHandler(e)}
        required
      />

      {/* hide and show password toggle */}
      {type === "password" && (
        <div
          className="absolute bottom-5 right-4 cursor-pointer"
          onClick={passwordVisibilityHandler}
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </div>
      )}

      {/* validation errors */}
      <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        Please enter a valid email address
      </span>
    </div>
  );
}

export default InputField;
