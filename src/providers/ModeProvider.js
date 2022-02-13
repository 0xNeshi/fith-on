import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { common, grey } from "@mui/material/colors";
import { createContext, useCallback, useState } from "react";

const olive = {
  100: "#d4d3bb",
  600: "#bab86c",
  900: "#949356",
};

const lightTheme = createTheme({
  palette: {
    primary: {
      main: olive[900],
    },
    secondary: {
      main: grey[100],
    },
    text: {
      primary: grey[700],
    },
    background: {
      paper: olive[100],
    },
  },
});

const oliveTheme = createTheme({
  palette: {
    primary: {
      main: common.white,
    },
    secondary: {
      main: olive[600],
    },
    text: {
      primary: common.white,
      secondary: common.white,
    },
    background: {
      default: olive[900],
      paper: olive[600],
    },
    action: {
      active: common.white,
    },
  },
});

const MODES = {
  light: "light",
  olive: "olive",
};

const MODE_CONFIGS = {
  [MODES.light]: lightTheme,
  [MODES.olive]: oliveTheme,
};

function ModeProvider({ children }) {
  const [mode, setMode] = useState(MODES.olive);

  const changeMode = useCallback((newMode) => setMode(newMode), []);

  return (
    <ModeContext.Provider value={{ mode, setMode: changeMode }}>
      <MuiThemeProvider theme={MODE_CONFIGS[mode]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ModeContext.Provider>
  );
}

const ModeContext = createContext({ mode: null, setMode: null });

export { ModeProvider as default, ModeContext, MODES, MODE_CONFIGS };
