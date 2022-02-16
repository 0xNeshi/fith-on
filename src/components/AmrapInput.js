import { styled, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ModeContext, NetworkStateContext } from "../providers";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default function AmrapInput({ reps, onChangeAmrapReps }) {
  const [amrapReps, setAmrapReps] = useState(reps);
  const { isOffline } = useContext(NetworkStateContext);
  const { mode } = useContext(ModeContext);

  const handleChangeAmrapReps = useCallback(
    () => amrapReps !== reps && onChangeAmrapReps(amrapReps),
    [amrapReps, reps, onChangeAmrapReps]
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
  }, [reps, handleChangeAmrapReps]);

  const value = useMemo(
    () => (isOffline && !amrapReps ? "/" : amrapReps || ""),
    [isOffline, amrapReps]
  );

  return (
    <Input
      variant="standard"
      inputProps={{ style: { textAlign: "center", padding: 0 } }}
      sx={{ width: 30, height: 30 }}
      value={value}
      onChange={handleChange}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={isOffline}
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
