// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangePicker } from '@mui/lba';

// const today = dayjs();
// const yesterday = dayjs().subtract(1, 'day');

// export default function DateValidationDisablePast() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={[
//           'DatePicker',
//           'DateTimePicker',
//           'TimePicker',
//           'DateRangePicker',
//         ]}
//       >   
//         <DemoItem component="DateRangePicker">
//           <DateRangePicker defaultValue={[yesterday, today]} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const DateRangeCalendar = () => {
  const initialDateRange = [null, null];
  const [value, setValue] = useState(initialDateRange);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DateRangePicker
          disablePast
          value={value}
          onChange={setValue}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default DateRangeCalendar;
