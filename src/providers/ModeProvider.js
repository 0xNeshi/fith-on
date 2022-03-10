import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { common, grey, orange } from "@mui/material/colors";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import logf from "../services/log";
import { get, update } from "../services/mode";
import { UserContext } from "./UserProvider";

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
      default: grey[100],
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

const darkTheme = createTheme({
  palette: {
    primary: {
      main: orange[600],
      contrastText: common.white,
    },
    secondary: {
      main: grey[800],
    },
    text: {
      primary: common.white,
      secondary: common.white,
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    action: {
      active: common.white,
    },
  },
});

const MODES = {
  light: "light",
  olive: "olive",
  dark: "dark",
};

const MODE_CONFIGS = {
  [MODES.light]: lightTheme,
  [MODES.olive]: oliveTheme,
  [MODES.dark]: darkTheme,
};

const ModeContext = createContext({
  mode: null,
  setMode: null,
  setDefaultMode: null,
  isLoading: false,
});

const DEFAULT_MODE = MODES.light;

function ModeProvider({ children }) {
  const { user, isLoading: isUserLoading } = useContext(UserContext);
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || DEFAULT_MODE
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (isUserLoading) return;

    async function getMode() {
      const userMode = await get(user.email);
      setMode(userMode || DEFAULT_MODE);
      setLoading(false);
    }

    if (!!user) {
      getMode();
    }
  }, [isUserLoading, user]);

  const saveMode = useCallback(
    async (newMode) => {
      try {
        setLoading(true);
        await update(user.email, newMode);
        setMode(newMode);
        localStorage.setItem("mode", newMode);
      } catch (error) {
        logf(user.email, "changeMode", error);
        alert("Error changing mode");
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line
    [user?.email]
  );

  const changeMode = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  return (
    <ModeContext.Provider
      value={{ mode, setMode: changeMode, saveMode, isLoading }}
    >
      <MuiThemeProvider theme={MODE_CONFIGS[mode]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ModeContext.Provider>
  );
}

export { ModeProvider as default, ModeContext, MODES };
