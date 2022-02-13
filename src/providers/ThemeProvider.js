import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { common, grey } from "@mui/material/colors";
import { createContext, useCallback, useState } from "react";

const blueGreen = "#569474";
const brown = "#947456";

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
    warning: {
      main: blueGreen,
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
      main: olive[900],
    },
    warning: {
      main: brown,
    },
    text: {
      primary: common.white,
      secondary: common.white,
    },
    background: {
      default: olive[600],
      paper: olive[900],
    },
    action: {
      active: common.white,
    },
  },
});

const THEMES = {
  light: "light",
  olive: "olive",
};

const THEME_CONFIGS = {
  [THEMES.light]: lightTheme,
  [THEMES.olive]: oliveTheme,
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("olive");

  const changeTheme = useCallback((newTheme) => setTheme(newTheme), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      <MuiThemeProvider theme={THEME_CONFIGS[theme]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

const ThemeContext = createContext({ theme: null, setTheme: null });

export { ThemeProvider as default, ThemeContext, THEMES };
