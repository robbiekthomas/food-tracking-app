import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import FoodList from "../components/FoodList";
import FoodTracker from "../components/TrackingPrecise";
import TrackingIntuitive from "../components/TrackingIntuitive";
import TrackingStandard from "../components/TrackingStandard";
import TrackingPrecise from "../components/TrackingPrecise";
import { useModeContext } from "../contexts/mode-status";

const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  useEffect(() => {}, [mode]);

  return (
    <div>
      {mode === "precise" && <TrackingPrecise />}
      {mode === "intuitive" && <TrackingIntuitive />}
      {mode === "standard" && <TrackingStandard />}
    </div>
  );
};

export default TrackingPage;
