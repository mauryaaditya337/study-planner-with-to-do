import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Change the handleSubmit function to:
const handleSubmit = (e) => {
  e.preventDefault();
  // For now, we'll just redirect to dashboard
  // Later we'll add actual authentication
  navigate('/dashboard');
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;