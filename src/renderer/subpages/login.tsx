import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { logIn } from '../network/client';
import TopBar from '../gui/top_bar';
import {ErrorSnackbar} from '../gui/util';

export default function LogInScreen() {

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  const validate = (value: string) =>
    /^[a-zA-Z0-9_]*$/.test(value) && value.length > 0 && value.length < 25;

  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate(username) || !validate(password)) {
      setUsernameError(!validate(username));
      setPasswordError(!validate(password));
    } else {
      logIn(username, password, (response) => {
        if (response.status !== 0) {
          setErrorMessage(`Error: ${response.message}`);
          setErrorSnackbarOpen(true);
        } else {
          navigate('/home');
        }
      });
    }
  };

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
                <Typography variant="h6" align="center">
                  Log in to Tanuki
                </Typography>
                <TextField
                  error={usernameError}
                  autoFocus
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                  helperText={
                    usernameError
                      ? 'Username should contain up to 24 alphanumeric symbols or undersores'
                      : ''
                  }
                />
                <TextField
                  error={passwordError}
                  type="password"
                  autoFocus
                  margin="normal"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                  helperText={
                    passwordError
                      ? 'Password should contain up to 24 alphanumeric symbols or undersores'
                      : ''
                  }
                />
                <Button variant="contained" onClick={onSubmit}>
                  Log in
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <ErrorSnackbar
        open={errorSnackbarOpen}
        setOpen={setErrorSnackbarOpen}
        autoHideDuration={6000}
        message={errorMessage}
      />
    </>
  );
}
