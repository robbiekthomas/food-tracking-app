import React from 'react'
import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDateContext } from '../contexts/date-context';




const DateSelector = ({ day, changeDay }) => {
const { selectedContextDate, setSelectedContextDate } = useDateContext();
 
  const onDayChange = (e) => setSelectedContextDate(e);

  return (
    <Stack spacing={4} sx={{ width: '250px' }}>

      <DatePicker
        label="Select Date"
        value={selectedContextDate}
        onChange={(e) => onDayChange(e)}
      />
      
    </Stack>
  )
}

export default DateSelector