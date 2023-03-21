
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { NavBar } from "./components";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/tracking-page" element={<TrackingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard-page" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
