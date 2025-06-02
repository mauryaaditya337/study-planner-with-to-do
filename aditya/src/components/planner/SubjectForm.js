import React, { useState } from 'react';
import { 
  TextField, Button, Box, Typography, Grid, Paper, Divider,
  FormControlLabel, Checkbox, FormGroup, IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Add, Delete, Save, PostAdd } from '@mui/icons-material';

function SubjectForm({ onPlanGenerated, onAddAnother }) {
  const [subject, setSubject] = useState({
    name: '',
    startDate: new Date(),
    finishDate: null,
    dailyHours: 2,
    studyDays: {
      monday: true, tuesday: true, wednesday: true,
      thursday: true, friday: true, saturday: false, sunday: false
    },
    chapters: [{ name: '', hours: 1 }]
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject(prev => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...subject.chapters];
    newChapters[index][field] = field === 'hours' ? parseInt(value) || 0 : value;
    setSubject(prev => ({ ...prev, chapters: newChapters }));
  };

  const addChapter = () => {
    setSubject(prev => ({
      ...prev,
      chapters: [...prev.chapters, { name: '', hours: 1 }]
    }));
  };

  const removeChapter = (index) => {
    if (subject.chapters.length > 1) {
      const newChapters = subject.chapters.filter((_, i) => i !== index);
      setSubject(prev => ({ ...prev, chapters: newChapters }));
    }
  };

  const generatePlan = () => {
    // Calculate total study hours needed
    const totalHours = subject.chapters.reduce((sum, chapter) => sum + (chapter.hours || 0), 0);
    
    // Calculate available study days
    const studyDates = calculateStudyDates(
      subject.startDate,
      subject.finishDate,
      subject.studyDays
    );
    
    // Distribute chapters across dates
    const plan = distributeChapters(subject, studyDates);
    
    setGeneratedPlan({
      subject: subject.name,
      totalHours,
      studyDays: studyDates.length,
      estimatedCompletion: studyDates[studyDates.length - 1],
      schedule: plan
    });
    
    if (onPlanGenerated) onPlanGenerated();
  };

  const handleAddAnother = () => {
    setGeneratedPlan(null);
    setSubject({
      name: '',
      startDate: new Date(),
      finishDate: null,
      dailyHours: 2,
      studyDays: {
        monday: true, tuesday: true, wednesday: true,
        thursday: true, friday: true, saturday: false, sunday: false
      },
      chapters: [{ name: '', hours: 1 }]
    });
    if (onAddAnother) onAddAnother();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
      {!generatedPlan ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Create New Study Plan
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); generatePlan(); }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subject Name"
                  name="name"
                  value={subject.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Daily Study Hours"
                  name="dailyHours"
                  type="number"
                  value={subject.dailyHours}
                  onChange={handleChange}
                  fullWidth
                  required
                  inputProps={{ min: 1, max: 8 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={subject.startDate}
                    onChange={(date) => setSubject(prev => ({ ...prev, startDate: date }))}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Finish/Exam Date (Optional)"
                    value={subject.finishDate}
                    onChange={(date) => setSubject(prev => ({ ...prev, finishDate: date }))}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Study Days
                </Typography>
                <FormGroup row>
                  {Object.entries(subject.studyDays).map(([day, checked]) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setSubject(prev => ({
                            ...prev,
                            studyDays: { ...prev.studyDays, [day]: e.target.checked }
                          }))}
                          name={day}
                        />
                      }
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                    />
                  ))}
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Chapters
                </Typography>
                {subject.chapters.map((chapter, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 2,
                    alignItems: 'center'
                  }}>
                    <TextField
                      label={`Chapter ${index + 1} Name`}
                      value={chapter.name}
                      onChange={(e) => handleChapterChange(index, 'name', e.target.value)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Hours Needed"
                      type="number"
                      value={chapter.hours}
                      onChange={(e) => handleChapterChange(index, 'hours', e.target.value)}
                      sx={{ width: '120px' }}
                      inputProps={{ min: 1 }}
                      required
                    />
                    <IconButton
                      onClick={() => removeChapter(index)}
                      color="error"
                      disabled={subject.chapters.length <= 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={addChapter}
                  sx={{ mt: 1 }}
                >
                  Add Chapter
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                  Generate Study Plan
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <PlanPreview 
          plan={generatedPlan} 
          onSave={() => console.log('Save functionality will be added with backend')}
          onAddAnother={handleAddAnother}
        />
      )}
    </Paper>
  );
}

function PlanPreview({ plan, onSave, onAddAnother }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
        Study Plan Generated!
      </Typography>
      
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        p: 3, 
        borderRadius: 1,
        mb: 3
      }}>
        <Typography variant="h6" gutterBottom>
          {plan.subject}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography><strong>Total Study Hours:</strong> {plan.totalHours}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography><strong>Study Days:</strong> {plan.studyDays}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography><strong>Estimated Completion:</strong> {plan.estimatedCompletion.toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
        
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
          Schedule Preview:
        </Typography>
        
        <Box sx={{ 
          maxHeight: '300px', 
          overflowY: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 1
        }}>
          {plan.schedule.map((day, index) => (
            <Box key={index} sx={{ mb: 1, pb: 1, borderBottom: index < plan.schedule.length - 1 ? '1px dashed' : 'none', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {day.date.toLocaleDateString()} ({day.date.toLocaleString('en-us', { weekday: 'long' })})
              </Typography>
              <Typography variant="body2">
                {day.tasks.join(', ')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={onSave}
          sx={{ flex: 1 }}
        >
          Save Plan
        </Button>
        <Button
          variant="outlined"
          startIcon={<PostAdd />}
          onClick={onAddAnother}
          sx={{ flex: 1 }}
        >
          Add Another Subject
        </Button>
      </Box>
    </Box>
  );
}

// Helper functions
function calculateStudyDates(startDate, finishDate, studyDays) {
  const dates = [];
  let current = new Date(startDate);
  
  // If finish date is provided, plan until finish date
  // Otherwise plan for 30 days by default
  const endDate = finishDate || new Date(current.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  while (current <= endDate) {
    const dayName = current.toLocaleDateString('en-us', { weekday: 'long' }).toLowerCase();
    if (studyDays[dayName]) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

function distributeChapters(subject, studyDates) {
  const schedule = [];
  let chapterIndex = 0;
  
  // Create a copy of chapters array to avoid mutating the original
  const chapters = [...subject.chapters];
  
  for (const date of studyDates) {
    if (chapterIndex >= chapters.length) break;
    
    const dailyTasks = [];
    let dailyHoursUsed = 0;
    
    while (dailyHoursUsed < subject.dailyHours && chapterIndex < chapters.length) {
      const chapter = chapters[chapterIndex];
      const hoursNeeded = chapter.hours - (chapter.hoursCompleted || 0);
      const hoursAvailable = subject.dailyHours - dailyHoursUsed;
      
      if (hoursNeeded <= hoursAvailable) {
        dailyTasks.push(`Finish ${chapter.name} (${hoursNeeded}h)`);
        dailyHoursUsed += hoursNeeded;
        chapterIndex++;
      } else {
        dailyTasks.push(`Study ${chapter.name} (${hoursAvailable}h)`);
        chapters[chapterIndex].hoursCompleted = (chapters[chapterIndex].hoursCompleted || 0) + hoursAvailable;
        dailyHoursUsed = subject.dailyHours;
      }
    }
    
    if (dailyTasks.length > 0) {
      schedule.push({
        date: new Date(date),
        tasks: dailyTasks
      });
    }
  }
  
  return schedule;
}

export default SubjectForm;