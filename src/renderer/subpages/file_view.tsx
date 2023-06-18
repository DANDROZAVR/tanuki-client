import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { renderOptions } from 'renderer/render_options';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextEditor from '../gui/text_editor';

export default function FileViewScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/home');
  }

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
      <TextEditor
        renderOptions={renderOptions}
        scriptState={location.state.scriptState}
      />
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
        <Button variant="contained" onClick={goBack}>
          Go back
        </Button>
        <Button variant="contained" onClick={goBack}>
          Go back
        </Button>
        <Button variant="contained" onClick={goBack}>
          Go back
        </Button>
        <Button variant="contained" onClick={goBack}>
          Go back
        </Button>
      </div>
    </div>
  );
}
