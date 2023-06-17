import 'reactflow/dist/style.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ThemeSelector({ updateEditorTheme }) {
  const [selected, setSelected] = React.useState(
    window.electron.store.get('theme')
  );

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: 'dark',
      },
    });
  }, []);

  const onChange = async (event) => {
    const tmpSelected = event.target.value;
    setSelected(tmpSelected);
    await window.theme.set(tmpSelected);
    window.electron.store.set('theme', tmpSelected);
    const darkTheme = await window.theme.get();
    updateEditorTheme(darkTheme ? 'vs-dark' : 'vs-light');
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        select
        label="Theme"
        margin="normal"
        value={selected}
        onChange={onChange}
        sx={{ minWidth: '100px' }}
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="system">System</MenuItem>
      </TextField>
    </ThemeProvider>
  );
}
