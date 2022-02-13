import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import ThemeProvider, { THEMES } from "../../providers/ThemeProvider";

export default function ModeSelector() {
  const { theme, setTheme } = useContext(ThemeProvider);

  return (
    <Group
      value={theme}
      exclusive
      onChange={(_, newTheme) => setTheme(newTheme)}
    >
      {Object.keys(THEMES).map((themeOption) => (
        <ToggleButton value={THEMES[themeOption]}>
          {THEMES[themeOption]}
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
