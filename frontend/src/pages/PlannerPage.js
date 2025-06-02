import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SubjectForm from '../components/planner/SubjectForm';
import ExclusionCalendar from '../components/planner/ExclusionCalendar';

function PlannerPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold', 
        mb: 4,
        color: 'primary.main',
        textAlign: 'center'
      }}>
        Smart Study Planner
      </Typography>
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <SubjectForm />
        <ExclusionCalendar />
      </Box>
    </Container>
  );
}

export default PlannerPage;