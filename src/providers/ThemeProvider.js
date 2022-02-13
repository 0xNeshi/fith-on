import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { common, grey } from "@mui/material/colors";
import { createContext, useCallback, useState } from "react";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#949356",
    },
    secondary: {
      main: grey[100],
    },
    warning: {
      main: "#569474",
    },
    text: {
      primary: grey[700],
    },
    background: {
      paper: "#d4d3bb",
    },
  },
});

const oliveGreenTheme = createTheme({
  palette: {
    primary: {
      main: common.white,
    },
    secondary: {
      main: "#947456",
    },
    warning: {
      main: common.white,
    },
    background: {
      default: "#949356",
      paper: "#ACAB71",
    },
    text: {
      primary: common.white,
      secondary: common.white,
    },
  },
});

const THEMES = {
  light: lightTheme,
  olive: oliveGreenTheme,
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  const changeTheme = useCallback((newTheme) => setTheme(THEMES[newTheme]), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

const ThemeContext = createContext({ theme: null, setTheme: null });

export { ThemeProvider as default, ThemeContext, THEMES };
