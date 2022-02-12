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
      default: "#949356",
      paper: "#ACAB71",
    },
  },
});

export default theme;
