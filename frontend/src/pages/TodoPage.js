import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function TodoPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        To-Do List
      </Typography>
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography>To-do list content will go here</Typography>
      </Box>
    </Container>
  );
}

export default TodoPage;