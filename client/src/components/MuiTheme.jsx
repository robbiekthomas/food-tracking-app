import { createTheme } from "@mui/material/styles";


const MuiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#676767',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0B031C',
      paper: '#0B031C',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.87)',
      disabled: 'rgba(255,255,255,0.38)',
    },
  },
});

export { MuiTheme };
