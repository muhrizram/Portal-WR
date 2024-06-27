import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Button, Grid, Hidden, Typography } from "@mui/material";
import { AlertContext } from "../../context";
import moment from "moment";

export default function DateRangeCalendar({
  updateFilterDate,
  updateJumpMonth,
  activeMonth,
  setStartDateCall,
  setEndDateCall,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { setDataAlert } = useContext(AlertContext);
  const [minDate, setMinDate] = useState(null);

  const handleDateChange = (date, isStart) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (isStart && date) {
      setStartDate(formattedDate);
      setEndDate(null);
      setMinDate(dayjs(date));
    } else {
      setEndDate(formattedDate);
    }
  };

  const ResetFilter = () => {
    updateFilterDate(moment(activeMonth).startOf('month').toDate(), moment(activeMonth).endOf('month').toDate());
    updateJumpMonth(moment(activeMonth).startOf('month').toDate());
    setStartDateCall(null);
    setStartDate(null);
    setEndDateCall(null);
    setEndDate(null);
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) {
      setDataAlert({
        severity: "error",
        message: "Incorrect date format",
        open: true,
      });
    }

    if (startDate > endDate) {
      setDataAlert({
        severity: "error",
        message: "End date can not be earlier than start date",
        open: true,
      });
    }

    if (startDate !== null && endDate !== null) {
      updateJumpMonth(moment(startDate).toDate());
      updateFilterDate(moment(startDate).toDate(), moment(endDate).toDate());
      setStartDateCall(startDate);
      setEndDateCall(endDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid marginTop="4vh" />
      <Grid
        container
        justifyContent="flex-end"
        marginTop={{ xs: "-3vh", sm: "-5vh" }}
      >
        <Hidden smUp>
          <Grid item xs={12} padding="5px">
            <Typography>Start Date</Typography>
            <DemoItem>
              <MobileDatePicker
                value={startDate}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  handleDateChange(date ? date.$d : null, true)
                }
              />
            </DemoItem>
          </Grid>
          <Grid item xs={12} padding="5px">
            <Typography>End Date</Typography>
            <DemoItem>
              <MobileDatePicker
                value={endDate}
                format="DD/MM/YYYY"
                disabled={!startDate}
                minDate={minDate}
                onChange={(date) =>
                  handleDateChange(date ? date.$d : null, false)
                }
              />
            </DemoItem>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "3%" }}>
            <Grid display="flex">
              <Button
                onClick={handleApplyFilter}
                sx={{ textTransform: "none" }}
              >
                Filters
              </Button>
              <Button onClick={ResetFilter} sx={{ textTransform: "none" }}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid item padding="5px">
            <Typography>Start Date</Typography>
            <DemoItem>
              <MobileDatePicker
                value={startDate}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  handleDateChange(date ? date.$d : null, true)
                }
              />
            </DemoItem>
          </Grid>
          <Grid item padding="5px">
            <Typography>End Date</Typography>
            <DemoItem>
              <MobileDatePicker
                value={endDate}
                disabled={!startDate}
                minDate={minDate}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  handleDateChange(date ? date.$d : null, false)
                }
              />
            </DemoItem>
          </Grid>
          <Grid item sx={{ marginTop: "2.5%" }}>
            <Grid display="flex">
              <Button
                onClick={handleApplyFilter}
                sx={{ textTransform: "none" }}
              >
                Filters
              </Button>
              <Button onClick={ResetFilter} sx={{ textTransform: "none" }}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </LocalizationProvider>
  );
}
