import { styled, TextField } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import { ModeContext } from "../providers";
import { InteractibleContext } from "./Dashboard/Dashboard";

export default function AmrapInput({ value, onChange }) {
  const [amrapReps, setAmrapReps] = useState(value);
  const { isInteractible, setInputting } = useContext(InteractibleContext);
  const { mode } = useContext(ModeContext);

  const handleChangeAmrapReps = useCallback(() => {
    if (amrapReps !== value) {
      onChange(amrapReps);
    }
    setInputting(false);
  }, [amrapReps, value, onChange, setInputting]);

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
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
          handleChangeAmrapReps();
        }
      }}
      onFocus={(e) => {
        e.target.select();
        setInputting(true);
      }}
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
