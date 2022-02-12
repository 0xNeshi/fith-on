import { createTheme } from "@mui/material";
import { common } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#947456",
    },
    warning: {
      main: common.white,
    },
    background: {
      default: "#ACAB71",
      paper: "#949356",
    },
  },
});

export default theme;
