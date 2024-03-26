import { ChangeEvent } from "react";
import { CheckboxProps } from "~/utils/models";

const CheckboxField = ({ interest, checked }: CheckboxProps) => {
  function checkboxEvent(e: any) {
    console.log(e);
  }
  return (
    <div className="flex gap-3">
      <input
        type="checkbox"
        checked={checked}
        className="h-6 w-6 cursor-pointer accent-black checked:before:bg-slate-600"
      />
      <label>{interest}</label>
    </div>
  );
};

export default CheckboxField;
