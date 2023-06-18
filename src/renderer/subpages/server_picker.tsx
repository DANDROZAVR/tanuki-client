import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { pickServer } from '../network/client.ts';
import ThemeSelector from '../gui/theme_selector';

export default function PickServerScreen() {
  const navigate = useNavigate();
  const [serverUrl, setServerUrl] = React.useState('http://localhost:3001');

  const onSubmit = (e) => {
    e.preventDefault();
    pickServer(serverUrl);
    navigate('/login');
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          padding={3}
        >
          <Paper elevation={3}>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={400}
              alignItems="center"
              justifyContent="center"
              margin="auto"
              padding={3}
            >
              <TextField
                autoFocus
                margin="normal"
                id="outlined-basic"
                label="Server URL"
                variant="outlined"
                value={serverUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setServerUrl(event.target.value);
                }}
              />
              <Button variant="contained" onClick={(e) => onSubmit(e)}>
                Pick server
              </Button>
              <ThemeSelector />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
