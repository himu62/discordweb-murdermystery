import type { TextFieldProps } from "@mui/material/TextField";
import MuiTextField from "@mui/material/TextField";
import { FC, useRef, useState } from "react";

const TextField: FC<Omit<TextFieldProps, "error" | "inputRef" | "onChange">> = (
  props
) => {
  const helperText = props.helperText ?? "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { helperText: _, ..._props } = props;

  const ref = useRef<HTMLInputElement>();
  const [error, setError] = useState(false);

  const handleChange = () => {
    if (ref.current) {
      setError(!ref.current?.validity.valid);
    }
  };

  return (
    <MuiTextField
      error={error}
      inputRef={ref}
      helperText={error && helperText}
      color={error ? "error" : "info"}
      onChange={handleChange}
      {..._props}
    />
  );
};
export default TextField;
