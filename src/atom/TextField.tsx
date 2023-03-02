import type { TextFieldProps } from "@mui/material/TextField";
import MuiTextField from "@mui/material/TextField";
import { FC, useRef, useState } from "react";

const TextField: FC<Omit<TextFieldProps, "error" | "inputRef" | "onChange">> = (
  props
) => {
  const ref = useRef<HTMLInputElement>();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState<typeof props.helperText>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { helperText: _, ..._props } = props;

  const handleChange = () => {
    if (ref.current) {
      setError(!ref.current?.validity.valid);

      if (ref.current?.validity.valid) {
        setHelperText("");
      } else {
        if (props.required && !ref.current?.value) {
          setHelperText("必須項目です");
        } else {
          setHelperText(props.helperText ?? "");
        }
      }
    }
  };

  return (
    <MuiTextField
      error={error}
      inputRef={ref}
      helperText={helperText}
      color={error ? "error" : "info"}
      onChange={handleChange}
      {..._props}
    />
  );
};
export default TextField;
