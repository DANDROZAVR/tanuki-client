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
import ScriptViewScreen from './subpages/script_view';
import PickServerScreen from './subpages/server_picker.tsx';
import VisualScriptViewScreen from './subpages/visual_script_view.tsx';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        white: {
          main: '#FFFFFF',
        },
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
            <Route path="script_view" element={<ScriptViewScreen />} />
            <Route
              path="visual_script_view"
              element={<VisualScriptViewScreen />}
            />
            <Route path="pick_server" element={<PickServerScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
