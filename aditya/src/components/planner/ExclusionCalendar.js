import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Chip,
  Paper,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarToday, Close } from '@mui/icons-material';

function ExclusionCalendar() {
  const [date, setDate] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);

  const handleAddDate = () => {
    if (date && !excludedDates.some(d => d.getTime() === date.getTime())) {
      setExcludedDates([...excludedDates, date]);
      setDate(null);
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    setExcludedDates(excludedDates.filter(date => date.getTime() !== dateToRemove.getTime()));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Exclude Dates from Study Plan
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select date to exclude"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          startIcon={<CalendarToday />}
          onClick={handleAddDate}
          disabled={!date}
        >
          Add Date
        </Button>
      </Box>

      {excludedDates.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Excluded Dates:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {excludedDates.map((date, index) => (
              <Chip
                key={index}
                label={date.toLocaleDateString()}
                onDelete={() => handleRemoveDate(date)}
                deleteIcon={<Close />}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default ExclusionCalendar;