import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9B7049",
    },
    warning: {
      main: "#9B4974",
    },
    background: {
      default: "#B5B362",
      paper: "#9B9949",
    },
  },
});

export default theme;
