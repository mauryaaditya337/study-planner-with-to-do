import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material'; // ✅ Added Button
import { Assignment, Book, CheckCircle, Schedule } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // ✅ Added Link
import ProgressChart from '../components/dashboard/ProgressChart';
import TaskList from '../components/dashboard/TaskList';

function DashboardPage() {
  // Temporary data - we'll replace with real data later
  const stats = [
    { title: 'Today\'s Tasks', value: '3/5', icon: <Assignment fontSize="large" /> },
    { title: 'Subjects', value: '4', icon: <Book fontSize="large" /> },
    { title: 'Completed', value: '12', icon: <CheckCircle fontSize="large" /> },
    { title: 'Hours This Week', value: '8.5', icon: <Schedule fontSize="large" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* ✅ Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          component={Link} 
          to="/planner"
          startIcon={<Book />}
        >
          Study Planner
        </Button>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/todo"
          startIcon={<Assignment />}
        >
          To-Do List
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: 'primary.main' }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Two main sections */}
      <Grid container spacing={3}>
        {/* Progress Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Study Progress
            </Typography>
            <Box sx={{ height: 300 }}>
              <ProgressChart />
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <TaskList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
