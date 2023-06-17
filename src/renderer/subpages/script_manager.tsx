import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { TextDialog } from '../gui/util';
import { DirInfo, loadScript, sendScript, logOut } from '../network/client';
import RemoteFileBrowser from '../gui/file_browser';
import ThemeSelector from '../gui/theme_selector';

export default function ScriptManagerScreen() {
  const navigate = useNavigate();
  const [newScriptOpen, setNewScriptOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = () => {
    setNewScriptOpen(false);
  };

  const onClick = () => {
    setNewScriptOpen(true);
  };

  const onLoadScript = (scriptName: string) => {
    loadScript(
      {
        name: scriptName,
        description: '',
        isDirectory: false,
      } as DirInfo,
      (scriptState) => {
        navigate('/file_view', {
          state: {
            scriptState,
          },
        });
      },
      (directoryState) => {}
    );
  }

  const goToPlayground = () => {
    navigate('/playground');
  };

  const onLogOut = () => {
    logOut();
    navigate('/login');
  };

  const newScriptDialog = (
    <TextDialog
      open={newScriptOpen}
      onSubmit={(value) => {
        setNewScriptOpen(false);
        sendScript('', value, '')
          .then((val) => {
            onLoadScript(value);
            return val;
          })
          .catch((e) => {
            console.log(e);
          });
      }}
      onCancel={() => {
        setNewScriptOpen(false);
      }}
      title="Create script"
      label="Script name"
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RemoteFileBrowser onOpenFile={onLoadScript} />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Button color="primary" variant="contained" onClick={onClick}>
          New script
        </Button>
        <Button variant="contained" onClick={goToPlayground}>
          Go to playground
        </Button>
        <Button variant="contained" onClick={onLogOut}>
          Log out
        </Button>
      </div>
      {newScriptDialog}
      <label>
        Choose theme:
        <ThemeSelector updateEditorTheme={(val: string) => {}} />
      </label>
    </div>
  );
}
