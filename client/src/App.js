import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { NavBar } from "./components";
import { LoginProvider } from "./contexts/login-status";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <NavBar />
        <Routes>
          <Route path="/tracker" element={<TrackingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
