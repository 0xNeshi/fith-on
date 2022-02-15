import { styled, TextField } from "@mui/material";
import { useContext } from "react";
import { ModeContext, MODES } from "../providers";

export default function Input({
  label,
  registerReturn,
  error,
  autoFocus,
  ...rest
}) {
  const { mode } = useContext(ModeContext);

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
      {...rest}
    />
  );
}

const StyledField = styled(TextField)(
  ({ mode }) =>
    mode !== MODES.light &&
    `& .MuiInput-underline:before {
  border-bottom: 1px solid rgba(255, 255, 255, 0.84);
}`
);
