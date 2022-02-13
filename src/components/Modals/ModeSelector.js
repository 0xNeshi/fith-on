import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import { ModeContext, MODES } from "../../providers";

export default function ModeSelector() {
  const { mode, setMode } = useContext(ModeContext);

  return (
    <Group value={mode} exclusive onChange={(_, newMode) => setMode(newMode)}>
      {Object.keys(MODES).map((modeOption) => (
        <ToggleButton value={MODES[modeOption]}>
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
