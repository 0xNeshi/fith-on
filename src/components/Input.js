import { TextField } from "@mui/material";

export default function Input({ label, registerReturn, error, ...rest }) {
  return (
    <TextField
      label={label}
      variant="standard"
      {...registerReturn}
      error={!!error}
      helperText={error}
      FormHelperTextProps={{
        style: { fontSize: 12 },
      }}
      {...rest}
    />
  );
}
