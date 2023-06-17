import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { logIn } from '../network/client';
import ThemeSelector from '../gui/theme_selector';
import TopBar from '../gui/top_bar';

export default function LogInScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    logIn(username, password, (response) => {
      if (response.status !== 0) {
        setErrorMessage('Error: ' + response.message);
      } else {
        navigate('/home');
      }
    });
  }

  return (
    <>
      <TopBar />
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
                <Typography variant="h6" align="center">Log in to Tanuki</Typography>
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
                <Button variant="contained" onClick={onSubmit}>
                  Log in
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <div className="formContainer">
        <span className="red">{errorMessage}</span>
      </div>
    </>
  );
}
