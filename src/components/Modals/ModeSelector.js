import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { ModeContext, MODES, MODE_CONFIGS } from "../../providers";

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
        <ToggleButton
          key={modeOption}
          value={MODES[modeOption]}
          mode={modeOption}
        >
          {MODES[modeOption]}
        </ToggleButton>
      ))}
    </Group>
  );
}

const Group = styled(ToggleButtonGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const ToggleButton = styled(MuiToggleButton)(
  ({ mode }) => `
    background-color: ${MODE_CONFIGS[MODES[mode]].palette.background.default};
    color: ${MODE_CONFIGS[MODES[mode]].palette.primary.main};
  `
);
