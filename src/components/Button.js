import { Button as MuiButton } from "@mui/material";

export default function Button(props) {
  const { submit, autoFocus, ...rest } = props;
  return (
    <MuiButton
      sx={{ width: 120, padding: "6px 12px" }}
      variant="outlined"
      type={submit ? "submit" : "button"}
      autoFocus={autoFocus || submit}
      {...rest}
    />
  );
}
