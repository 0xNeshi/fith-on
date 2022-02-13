import { styled, TextField } from "@mui/material";
import { useContext } from "react";
import { ThemeContext, THEMES } from "../providers/ThemeProvider";

export default function Input({ label, registerReturn, error, ...rest }) {
  const { theme } = useContext(ThemeContext);

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
      mode={theme}
      {...rest}
    />
  );
}

const StyledField = styled(TextField)(
  ({ mode }) =>
    mode === THEMES.olive &&
    `& .MuiInput-underline:before {
  border-bottom: 1px solid rgba(255, 255, 255, 0.84);
}`
);
