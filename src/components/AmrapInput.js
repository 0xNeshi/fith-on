import { styled } from "@mui/material";
import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import { NetworkStateContext } from "../providers";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export const AmrapInput = ({ reps, onChangeAmrapReps }) => {
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
    <Input
      value={value}
      type="text"
      onChange={handleChange}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={isOffline}
    />
  );
};

const Input = styled((props) => <input {...props} />)(
  ({ theme }) => `
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 2px;
  color: lightgrey;
  background-color: ${theme.palette.background.default};
  font-weight: 600;
  text-align: center;

  :disabled {
    background-color: transparent;
  }
`
);
