import { styled, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ModeContext } from "../providers";
import { InteractibleContext } from "./Dashboard/Dashboard";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default function AmrapInput({ value, onChange }) {
  const [amrapReps, setAmrapReps] = useState(value);
  const isInteractible = useContext(InteractibleContext);
  const { mode } = useContext(ModeContext);

  const handleChangeAmrapReps = useCallback(
    () => amrapReps !== value && onChange(amrapReps),
    [amrapReps, value, onChange]
  );

  const handleKeyDown = useCallback(
    (e) => e.keyCode === ENTER_KEY && handleChangeAmrapReps(),
    [handleChangeAmrapReps]
  );

  const handleFocus = useCallback((e) => e.target.select(), []);

  const handleChange = useCallback(
    (e) => setAmrapReps(e.target.value),
    [setAmrapReps]
  );

  useEffect(() => {
    const timer = setTimeout(() => handleChangeAmrapReps(), WAIT_INTERVAL);
    return () => clearTimeout(timer);
  }, [value, handleChangeAmrapReps]);

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
      onChange={handleChange}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={!isInteractible}
      mode={mode}
    />
  );
}

const Input = styled(TextField)(
  ({ theme }) =>
    `& .MuiInput-underline:before {
      border-bottom: 1px solid ${theme.palette.primary.main};
    }`
);
