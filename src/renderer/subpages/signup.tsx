import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../network/client.ts';
import ThemeSelector from '../gui/theme_selector';

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
                alignItems="center"
                justifyContent="center"
                margin="auto"
                padding={3}
              >
                <Typography variant="h6">Sign up to Tanuki</Typography>
                <TextField
                  autoFocus
                  margin="dense"
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
                  margin="dense"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                />
                <Link to="/login" align="center">Already have an account? Log in here.</Link>
                <Link to="/pick_server">Pick another server.</Link>
                <Button variant="contained" onClick={(e) => onSubmit(e)}>
                  Sign up
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <div className="formContainer">
        <span className="red">{errorMessage}</span>

        <label>
          Choose theme:
          <ThemeSelector updateEditorTheme={(val: string) => {}} />
        </label>
      </div>
    </>
  );
}
