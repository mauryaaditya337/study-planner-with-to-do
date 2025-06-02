import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Dashboard, School } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        textAlign: 'center', 
        mt: 10,
        p: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: 3
      }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Smart Study Planner
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Organize your study schedule and boost productivity
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 5 }}>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            size="large"
            startIcon={<Dashboard />}
            sx={{ px: 4, py: 1.5 }}
          >
            Go to Dashboard
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            startIcon={<School />}
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;