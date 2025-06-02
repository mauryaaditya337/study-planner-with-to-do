import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Checklist as ChecklistIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { ThemeContext } from '../../contexts/ThemeContext';

function Navbar() {
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Study Planner
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ mx: 1 }}
        >
          Home
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/dashboard"
          startIcon={<DashboardIcon />}
          sx={{ mx: 1 }}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/planner"
          startIcon={<BookIcon />}
          sx={{ mx: 1 }}
        >
          Planner
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/todo"
          startIcon={<ChecklistIcon />}
          sx={{ mx: 1 }}
        >
          To-Do
        </Button>

        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
