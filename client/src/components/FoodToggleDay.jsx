import React from 'react'
import { getTodaysDate } from '../helper-functions/nutritionCalculations'
import { Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export const FoodToggleDay = () => {

  let date = getTodaysDate();

  return (
    <div>
      <Button>Previous</Button>
      <Typography variant="h6" gutterBottom>
        {date}
      </Typography>
      <Button>Next</Button>

    </div>
  )
}
