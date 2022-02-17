import { styled, TextField } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { ModeContext } from "../providers";

export default function Input(props) {
  const inputRef = useRef();
  const { mode } = useContext(ModeContext);

  const { label, registerReturn, error, autoFocus, ...rest } = props;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [inputRef, autoFocus]);

  return (
    <StyledField
      label={label}
      variant="standard"
      {...registerReturn}
      error={!!error}
      helperText={error}
      FormHelperTextProps={{
        style: { fontSize: 12 },
      }}
      mode={mode}
      inputRef={inputRef}
      {...rest}
    />
  );
}

const StyledField = styled(TextField)(
  ({ theme }) =>
    `& .MuiInput-underline:before {
      border-bottom: 1px solid ${theme.palette.primary.main};
    }`
);
