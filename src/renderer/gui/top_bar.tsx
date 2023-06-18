import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from './theme_selector';

export default function TopAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            たぬき
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button color="inherit" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
          <Button color="inherit" onClick={() => navigate('/pick_server')}>
            Change server
          </Button>
          <ThemeSelector forceDark />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
