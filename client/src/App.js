import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components";
import { ContextProvider, useStateContext } from "./contexts/ContextProvider";
import { LoginProvider } from "./contexts/login-status";
import { ModeProvider } from "./contexts/mode-status";
import { DateProvider } from "./contexts/date-context";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import TrackingPage from "./pages/TrackingPage";
import { ThemeProvider } from '@mui/material/styles';
import { MuiTheme } from "./components/MuiTheme"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


function App({ children }) {
  return (
    <BrowserRouter>
      <ContextProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
          <LoginProvider>
            <DateProvider>
              <ModeProvider>
              <ThemeProvider theme={MuiTheme}>
                <NavBar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/tracker" element={<TrackingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
                </ThemeProvider>
              </ModeProvider>
            </DateProvider>
          </LoginProvider>
        </LocalizationProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
