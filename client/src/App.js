import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { NavBar } from "./components";
import { ContextProvider, useStateContext } from "./contexts/ContextProvider";
import { LoginProvider } from "./contexts/login-status";
import { ModeProvider } from "./contexts/mode-status";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <LoginProvider>
          <ModeProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tracker" element={<TrackingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </ModeProvider>
        </LoginProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
