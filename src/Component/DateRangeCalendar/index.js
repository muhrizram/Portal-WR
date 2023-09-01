import React, { useEffect,useContext } from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button, Grid, Typography } from '@mui/material';
import { AlertContext } from '../../context';

export default function DateRangeCalendar({setStartDateCall, setEndDateCall, setWeekendDates}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);  
  const [selectedMonthRange, setSelectedMonthRange] = React.useState('');
  const { setDataAlert } = useContext(AlertContext);

  const handleDateChange = (date, isStart) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (isStart) {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }
  };

  const calculateWeekendDates = (start, end) => {
    const weekendDates = [];
    let currentDay = start.clone();

    while (currentDay.isBefore(end) || currentDay.isSame(end, 'day')) {
      if (currentDay.day() === 0 || currentDay.day() === 6) {
        weekendDates.push(currentDay.format('YYYY-MM-DD'));
      }
      currentDay = currentDay.add(1, 'day');
    }

    return weekendDates;
  };

  const ResetFilter = () => {
    setStartDateCall(null)
    setEndDateCall(null)
    setWeekendDates([])
  }

  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      console.log("Incorrect date format")
      setDataAlert({
        severity: "error",
        message: "Incorrect date format",
        open: true,
      });
    }
   
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const weekendDates = calculateWeekendDates(start, end);     

    console.log("Weekend Dates:", weekendDates);
    setWeekendDates(weekendDates)

    setStartDateCall(startDate)
    setEndDateCall(endDate)
    }    

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid marginTop='4vh'/>
      <div style={{ position: 'relative' }}>
        <Grid position='absolute' margin={4}>
          <Typography variant='TextBulankalender'>{selectedMonthRange}</Typography>
        </Grid>
      </div>       
        <Grid container justifyContent="flex-end" marginTop="-5vh">          
          <Grid item padding="5px">
            <Typography>Start Date</Typography>
            <DemoItem>
              <MobileDatePicker value={startDate} onChange={(date) => handleDateChange(date.$d, true)} />
            </DemoItem>
          </Grid>
          <Grid item padding="5px">
            <Typography>End Date</Typography>
            <DemoItem>
              <MobileDatePicker value={endDate} onChange={(date) => handleDateChange(date.$d, false)} />
            </DemoItem>            
          </Grid>
          <Grid item sx={{marginTop:'2%'}}>
            <Grid display='flex'>
            <Button onClick={handleApplyFilter}>Filters</Button>
            <Button onClick={ResetFilter}>Reset</Button>
            </Grid>
          </Grid>
        </Grid>
    </LocalizationProvider>
  );
}
