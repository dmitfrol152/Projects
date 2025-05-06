import { TextFieldProps } from "./types";
import "./styles.css";
import IconSearch from "/src/assets/icon-search.svg?react";

export const TextField = ({
  type,
  value,
  placeholder,
  onChange,
}: TextFieldProps) => {
  return (
    <div className="custom-input">
      <IconSearch className="custom-input__logo" />
      <input
        className="custom-input__field"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
