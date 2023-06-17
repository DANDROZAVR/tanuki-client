import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../network/client.ts';
import TopAppBar from '../gui/top_bar';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function onSubmit(e) {
    e.preventDefault();
    createUser(username, password, response => {
      if (response.status !== 0) {
        setErrorMessage("Error: " + response.message);
      } else {
        navigate('/login');
      }
    });
  }

  return (
    <>
    <TopAppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={4}>
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
                alignItems="stretch"
                justifyContent="center"
                margin="auto"
                padding={3}
              >
                <Typography variant="h6" align="center">Sign up to Tanuki</Typography>
                <TextField
                  autoFocus
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                />
                <TextField
                  type="password"
                  autoFocus
                  margin="normal"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                />
                <Button variant="contained" onClick={(e) => onSubmit(e)}>
                  Sign up
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid><span className="red">{errorMessage}</span>
    </>
  );
}
