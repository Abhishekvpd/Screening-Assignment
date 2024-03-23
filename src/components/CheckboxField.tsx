import { ChangeEvent } from "react";

const CheckboxField = () => {

  function checkboxEvent(e: any) {
    console.log(e);
  }
  return (
    <div>
      <input type="checkbox"/>
      <label>interest</label>
    </div>
  );
};

export default CheckboxField;
