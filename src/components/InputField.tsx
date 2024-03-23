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
  onChangeHandler
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
        // pattern={pattern ? pattern : ""}
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={e => onChangeHandler(e)}
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
      <span className="hidden text-wrap text-sm font-normal text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        {errorMessage}
      </span>
    </div>
  );
}

export default InputField;
