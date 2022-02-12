import { createTheme } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lightGreen[900],
    },
    secondary: {
      main: grey[800],
    },
    warning: {
      main: grey[300],
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
  },
});

export default theme;
