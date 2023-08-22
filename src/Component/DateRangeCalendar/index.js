import * as React from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button, Grid, Typography } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';

export default function DateRangeCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid marginTop='4vh'/>
      <div style={{ position: 'relative' }}>
        <Grid container position="absolute" justifyContent="flex-end" marginTop="-5vh">
          <Grid item padding="5px">
            <Typography>Start Date</Typography>
            <DemoItem>
              <MobileDatePicker/>
            </DemoItem>
          </Grid>
          <Grid item padding="5px">
            <Typography>End Date</Typography>
            <DemoItem>
              <MobileDatePicker/>
            </DemoItem>            
          </Grid>
          <Grid item sx={{marginTop:'4vh'}}>
            <Button  startIcon={<FilterList style={{ fontSize: 32 }} />} >Filters</Button>
          </Grid>                  
        </Grid>
      </div>      
    </LocalizationProvider>
  );
}


// import React, { useState } from 'react';
// import { Box, TextField } from '@mui/material';
// import { DateRangePicker } from '@mui/x ';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

// const DateRangeCalendar = () => {
//   const initialDateRange = [null, null];
//   const [value, setValue] = useState(initialDateRange);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box>
//         <DateRangePicker
//           disablePast
//           value={value}
//           onChange={setValue}
//           renderInput={(startProps, endProps) => (
//             <>
//               <TextField {...startProps} />
//               <Box sx={{ mx: 2 }}> to </Box>
//               <TextField {...endProps} />
//             </>
//           )}
//         />
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default DateRangeCalendar;
