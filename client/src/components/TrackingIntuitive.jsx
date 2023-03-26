import React, { useState } from "react";
import HabitGoalTracker from "./HabitGoalTracker";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box, { BoxProps } from '@mui/material/Box';

const TrackingIntuitive = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
     
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      
      
      <div>
      <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Breakfast
        </Typography>

        <IntuitiveList setToggle={setToggle} mealId={1} meal={"Breakfast"} />
        <IntuitiveLog
          toggle={toggle}
          setToggle={setToggle}
          meal={"breakfast"}
          mealId={1}
        />
      </Card>

      <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Lunch
        </Typography>

        <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"} />
        <IntuitiveLog
          toggle={toggle}
          setToggle={setToggle}
          meal={"lunch"}
          mealId={2}
        />
      </Card>

      <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Dinner
        </Typography>

        <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"} />
        <IntuitiveLog
          toggle={toggle}
          setToggle={setToggle}
          meal={"dinner"}
          mealId={4}
        />
      </Card>

      <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Snack
        </Typography>

        <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"} />
        <IntuitiveLog
          toggle={toggle}
          setToggle={setToggle}
          meal={"snack"}
          mealId={3}
        />
      </Card>
      </div>

      <HabitGoalTracker />

      </Box>
    </div>
  );
};

export default TrackingIntuitive;
