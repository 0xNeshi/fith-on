import { styled, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ModeContext } from "../providers";
import { InteractibleContext } from "./Dashboard/Dashboard";

const WAIT_INTERVAL = 1000;

export default function AmrapInput({ value, onChange }) {
  const [amrapReps, setAmrapReps] = useState(value);
  const isInteractible = useContext(InteractibleContext);
  const { mode } = useContext(ModeContext);

  const handleChangeAmrapReps = useCallback(() => {
    if (amrapReps !== value) {
      onChange(amrapReps);
    }
  }, [amrapReps, value, onChange]);

  useEffect(() => {
    const timer = setTimeout(() => handleChangeAmrapReps(), WAIT_INTERVAL);
    return () => clearTimeout(timer);
  }, [handleChangeAmrapReps]);

  const displayValue = useMemo(
    () => (!isInteractible && !amrapReps ? "/" : amrapReps || ""),
    [isInteractible, amrapReps]
  );

  return (
    <Input
      variant="standard"
      inputProps={{ style: { textAlign: "center", padding: 0 } }}
      sx={{ width: 30, height: 30 }}
      value={displayValue}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setAmrapReps(e.target.value)}
      onBlur={handleChangeAmrapReps}
      onKeyDown={(e) => e.key === "Enter" && handleChangeAmrapReps()}
      onFocus={(e) => e.target.select()}
      disabled={!isInteractible}
      mode={mode}
      autoComplete="off"
    />
  );
}

const Input = styled(TextField)(
  ({ theme }) =>
    `& .MuiInput-underline:before {
      border-bottom: 1px solid ${theme.palette.primary.main};
    }`
);
