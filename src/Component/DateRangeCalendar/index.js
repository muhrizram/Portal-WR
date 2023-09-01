import React, { useEffect,useContext } from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button, Grid, Typography } from '@mui/material';
import { AlertContext } from '../../context';

export default function DateRangeCalendar({setStartDateCall, setEndDateCall}) {
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

  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      console.log("Incorrect date format")
      setDataAlert({
        severity: "error",
        message: "Incorrect date format",
        open: true,
      });
    }else{
      // const startMonth = dayjs(startDate).format('MMMM');
      // const endMonth = dayjs(endDate).format('MMMM');
      // const startYear = dayjs(startDate).format('YYYY');
      // const endYear = dayjs(endDate).format('YYYY');
  
      // const formattedRange = startMonth === endMonth && startYear === endYear
      //   ? `${startMonth} ${startYear}`
      //   : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  
      // setSelectedMonthRange(formattedRange);
      
      // if (startDate && endDate) {
      //   const daysDifference = dayjs(endDate).diff(startDate, 'day');
      //   if (daysDifference >= 28 && daysDifference <= 30) {
      //     console.log('Selected range is 30 days');
      //   } else {
      //     console.log('Selectedlebih');
      //   }
      // }
      // const hasil = []
      // const startDatenew = new Date(startDate);
      // const endDatenew = new Date(endDate);
  
      // while (startDatenew <= endDatenew) {
      //   hasil.push(startDatenew.toISOString().split('T')[0]);
      //   startDatenew.setDate(startDatenew.getDate() + 1);
      // }
    };
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
            <Button onClick={handleApplyFilter}>Filters</Button>
          </Grid>                  
        </Grid>      
    </LocalizationProvider>
  );
}
