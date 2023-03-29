import { createTheme } from "@mui/material/styles";

const MuiTheme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: 'white',
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#dedcdc",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#1d1c1f",
      paper: "#1d1c1f",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
      secondary: "rgba(255,255,255,0.87)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
});

export { MuiTheme };
