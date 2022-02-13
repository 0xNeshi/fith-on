import { TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { NetworkStateContext } from "../providers";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default function AmrapInput({ reps, onChangeAmrapReps }) {
  const [amrapReps, setAmrapReps] = useState(reps);
  const { isOffline } = useContext(NetworkStateContext);

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
    <TextField
      variant="standard"
      inputProps={{ style: { textAlign: "center", padding: 0 } }}
      sx={{ width: 30, height: 30 }}
      value={value}
      onChange={handleChange}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={isOffline}
    />
  );
}
