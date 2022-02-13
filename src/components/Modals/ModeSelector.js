import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback, useContext } from "react";
import { ModeContext, MODES } from "../../providers";

export default function ModeSelector() {
  const { mode, setMode } = useContext(ModeContext);

  const handleModeSelect = useCallback((_, newMode) => {
    if (!!newMode) {
      setMode(newMode);
    }
  }, []);

  return (
    <Group value={mode} exclusive onChange={handleModeSelect}>
      {Object.keys(MODES).map((modeOption) => (
        <ToggleButton key={modeOption} value={MODES[modeOption]}>
          {MODES[modeOption]}
        </ToggleButton>
      ))}
    </Group>
  );
}

const Group = styled(ToggleButtonGroup)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;
