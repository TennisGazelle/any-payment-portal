import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Tooltip } from '@mui/material';

import './App.css';


function App() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const isWeekend = (date: Dayjs) => {
    const day = date.day();
    return day === 0 || day === 6;
  }

  const isAfter16th = (date: Dayjs) => {
    return date.date() >= 17;
  }

  const renderToolTipOnDay = (day: any, selectedDates: any, dayInCurrentMonth: any) => {
    if (day.getDate() >= 17) {
      return (
        <Tooltip title="Cannot Pick Date, Late Fees Incur on the 16th">
          <div>{day.getDate()}</div>
        </Tooltip>
      );
    }
    return(
      <div>{dayInCurrentMonth}</div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isAfter16th}
          // renderDay={renderToolTipOnDay}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
