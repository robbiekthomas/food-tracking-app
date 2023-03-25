import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HungerScore = (props) => {

  const score = props.hungerScore;

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      {score == 1 && <Typography variant="body1" gutterBottom>Starving</Typography>}

      {score == 2 && <Typography variant="body1" gutterBottom>Overly Hungry</Typography>}

      {score == 3 && <Typography variant="body1" gutterBottom>Hungry</Typography>}

      {score == 4 && <Typography variant="body1" gutterBottom>Somewhat Hungry</Typography>}

      {score == 5 && <Typography variant="body1" gutterBottom>Neutral</Typography>}

      {score == 6 && <Typography variant="body1" gutterBottom>Somewhat Full</Typography>}

      {score == 7 && <Typography variant="body1" gutterBottom>Comfortably Full</Typography>}

      {score == 8 && <Typography variant="body1" gutterBottom>Slightly Full</Typography>}

      {score == 9 && <Typography variant="body1" gutterBottom> Uncomfortably Full</Typography>}

      {score == 10 && <Typography variant="body1" gutterBottom>Physically Ill</Typography>}
    </Box>
  );
};

export default HungerScore;
