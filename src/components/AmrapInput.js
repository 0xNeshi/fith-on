import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { NetworkStateContext } from "../providers";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export const AmrapInput = ({ reps, onChangeAmrapReps }) => {
  const [amrapReps, setAmrapReps] = useState(reps);
  const { isOnline } = useContext(NetworkStateContext);

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
    () => (!isOnline && !amrapReps ? "/" : amrapReps || ""),
    [isOnline, amrapReps]
  );

  return (
    <Input
      value={value}
      type="text"
      onChange={handleChange}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={!isOnline}
    />
  );
};

const Input = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 2px;
  color: lightgrey;
  background-color: #444;
  font-weight: 600;
  text-align: center;

  :disabled {
    background-color: transparent;
  }
`;
