import React from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { DatePicker } from "react-datepicker";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const locales = {
//   "en-US": require("date-fns/locale/en-US"),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const events = [
//   {
//     start: new Date(),
//     end: new Date(),
//     allday: true,
//     title: "Rapat",
//     onclick: () => alert("Rapat"),
//   },
// ];

const CalendarCustom = () => {
  // const [newEvent, setNewEvent] = useState({
  //   title: "",
  //   start: "",
  //   end: "",
  // });
  // const [allEvents, setAllEvents] = useState(events);
  // const [value, setValue] = React.useState(dayjs("2022-04-17"));

  // function handleAddEvent() {
  //   setAllEvents((prevState) => [...prevState, newEvent]);
    // setNewEvent({
    //     title: "",
    //     start: "",
    //     end: "",
    // });
  // }

  return (
    <div>
      <span>calendar</span>
      {/* <h1>CALENDAR</h1> */}
      {/* <div>
        <input
          type="text"
          placeholder="Add"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
            <DatePicker selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
      </div> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            label="Start Date"
            selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
          />
          <DatePicker
            label="End Date"
            selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
          />
        </DemoContainer>
      </LocalizationProvider>
      <button onClick={handleAddEvent}>Add</button>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}
    </div>
  );
}

export default MyCalendar;
