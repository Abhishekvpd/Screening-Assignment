import { ChangeEvent, MutableRefObject } from "react";

export type InputProps = {
  id: number;
  label: string;
  placeholder: string;
  type: string;
  errorMessage: string;
  pattern?: string;
  name: string;
  value: string;
  onChangeHandler: (arg: ChangeEvent<HTMLInputElement>) => void;
};
