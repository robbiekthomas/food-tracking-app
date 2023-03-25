import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import FoodList from "../components/FoodList";
import FoodTracker from "../components/TrackingPrecise";
import TrackingIntuitive from "../components/TrackingIntuitive";
import TrackingStandard from "../components/TrackingStandard";
import TrackingPrecise from "../components/TrackingPrecise";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import { Box } from "@mui/system";

const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  const { planet } = useStateContext();
  useEffect(() => {}, [mode]);

  return (
    <div>
      <Box
        component="img"
        sx={{
          height: "100%",
          width: "60%",
          position: "absolute",
          top: 0,
          right: "-500px",
          "z-index": "-1",
          opacity: 0.2,
        }}
        src={planet}
      />
      {mode === "precise" && <TrackingPrecise />}
      {mode === "intuitive" && <TrackingIntuitive />}
      {mode === "standard" && <TrackingStandard />}
    </div>
  );
};

export default TrackingPage;
