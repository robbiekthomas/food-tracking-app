import React from "react";
import { Switch, Box, FormControlLabel } from "@mui/material";

const SwitchElement = ({ label, checked, onChange }) => {
  return (
    <Box>
      <FormControlLabel
        sx={{ color: "white" }}
        label={label}
        control={<Switch checked={checked} />}
        onChange={onChange}
      ></FormControlLabel>
    </Box>
  );
};

export default SwitchElement;
