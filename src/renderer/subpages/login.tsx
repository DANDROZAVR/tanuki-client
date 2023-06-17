import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { logIn } from '../network/client.ts';
import ThemeSelector from '../gui/theme_selector';

export default function LogInScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function onSubmit(e) {
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
                  margin="dense"
                  id="outlined-basic"
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
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                />
                <Link to="/signin">Doesn&apos;t have an account? Create it here.</Link>
                <Link to="/pick_server">Pick another server.</Link>
                <Button variant="contained" onClick={onSubmit}>Log in</Button>
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
