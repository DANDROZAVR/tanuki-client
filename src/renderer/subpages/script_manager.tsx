import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextDialog } from '../gui/util';
import { DirInfo, loadScript, sendScript, sendNodes, logOut } from '../network/client';
import RemoteFileBrowser from '../gui/file_browser';

export default function ScriptManagerScreen() {
  const navigate = useNavigate();
  const [newScriptOpen, setNewScriptOpen] = useState(false);
  const [newVisualScriptOpen, setNewVisualScriptOpen] = useState(false);

  const newScript = () => {
    setNewScriptOpen(true);
  };

  const newVisualScript = () => {
    setNewVisualScriptOpen(true);
  };

  const onLoadScript = (scriptName: string) => {
    if (scriptName.split('.')[1] === 'tnk') {
      loadScript(
        {
          name: scriptName,
          description: '',
          isDirectory: false,
        } as DirInfo,
        (scriptState) => {
          navigate('/script_view', {
            state: {
              scriptState,
            },
          });
        },
        (directoryState) => {}
      );
    } else {
      loadScript(
        {
          name: scriptName,
          description: '',
          isDirectory: false,
        } as DirInfo,
        (scriptState) => {
          navigate('/visual_script_view', {
            state: {
              scriptState,
            },
          });
        },
        (directoryState) => {}
      );
    }
  };

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
      onSubmit={async (value) => {
        setNewScriptOpen(false);
        await sendScript('', `${value}.tnk`, '');
        onLoadScript(`${value}.tnk`);
      }}
      onCancel={() => {
        setNewScriptOpen(false);
      }}
      title="Create script"
      label="Script name"
    />
  );

  const newVisualScriptDialog = (
    <TextDialog
      open={newVisualScriptOpen}
      onSubmit={async (value) => {
        setNewVisualScriptOpen(false);
        await sendNodes('[]', '[]', `${value}.vtnk`, '');
        onLoadScript(`${value}.vtnk`);
      }}
      onCancel={() => {
        setNewVisualScriptOpen(false);
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
        <Button variant="contained" onClick={newScript}>
          New script
        </Button>
        <Button variant="contained" onClick={newVisualScript}>
          New visual script
        </Button>
        {/*<Button variant="contained" onClick={goToPlayground}>
          Go to playground
      </Button>*/}
        <Button variant="contained" onClick={onLogOut}>
          Log out
        </Button>
      </div>
      {newScriptDialog}
      {newVisualScriptDialog}
    </div>
  );
}
