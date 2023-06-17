import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextDialog, RequestFieldAndButton } from '../gui/util';
import { DirInfo, loadScript, sendScript, logOut } from '../network/client';
import FileBrowser from '../gui/file_browser';

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

  function onLoadScript(scriptName: string) {
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

  function goToPlayground() {
    navigate('/playground');
  }

  function onLogOut() {
    logOut();
    navigate('/login');
  }

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
          .catch((e) => {console.log(e)});
      }}
      onCancel={() => {
        setNewScriptOpen(false);
      }}
      label="Create script"
    />
  );

  return (
    <>
      <FileBrowser
        onOpenFile={(val) => {
          onLoadScript(val);
        }}
      />
      <Button variant="contained" onClick={onClick}>
        New script
      </Button>
      <Button variant="contained" onClick={goToPlayground}>
        Go to playground
      </Button>
      <Button variant="contained" onClick={onLogOut}>
        Log out
      </Button>
      {newScriptDialog}
    </>
  );
}
