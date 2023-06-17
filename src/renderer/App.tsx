import './gui/style.css';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Playground from './gui/playground';
import Layout from './subpages/layout';
import LogInScreen from './subpages/login';
import SignUpScreen from './subpages/signup';
import ScriptManagerScreen from './subpages/script_manager';
import FileViewScreen from './subpages/file_view';
import PickServerScreen from './subpages/server_picker.tsx';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    });
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PickServerScreen />} />
            <Route path="login" element={<LogInScreen />} />
            <Route path="signup" element={<SignUpScreen />} />
            <Route path="home" element={<ScriptManagerScreen />} />
            <Route path="playground" element={<Playground />} />
            <Route path="file_view" element={<FileViewScreen />} />
            <Route path="pick_server" element={<PickServerScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
