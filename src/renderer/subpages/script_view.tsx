import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { renderOptions } from 'renderer/render_options';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextEditor from '../gui/text_editor';
import { DateTimeDialog } from '../gui/util';
import { execScript, scheduleScript, sendOrUpdate } from '../network/client.ts';

export default function FileViewScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scriptValue, setScriptValue] = useState(
    location.state.scriptState.value
  );
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [log, setLog] = useState('');

  const goBack = () => {
    navigate('/home');
  };

  const onSave = () => {
    sendOrUpdate(scriptValue, location.state.scriptState.scriptName);
  };

  const onRun = () => {
    execScript(location.state.scriptState.scriptName, (response) => {setLog(JSON.stringify(response))});
  };

  const onSchedule = () => {
    setScheduleDialogOpen(true);
  };

  const scheduleDialog = (
    <DateTimeDialog
      open={scheduleDialogOpen}
      onSubmit={async (value) => {
        setScheduleDialogOpen(false);
        scheduleScript(location.state.scriptState.scriptName, value);
      }}
      onCancel={() => {
        setScheduleDialogOpen(false);
      }}
      title="Schedule script execution"
      label="Date"
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          maxHeight: '100vh',
          justifyContent: 'spread',
          alignItems: 'center',
        }}
      >
        <Typography variant="normal" align="left" sx={{ margin: '10px' }}>
          {location.state.scriptState.scriptName}
        </Typography>
      </div>
      <TextEditor
        renderOptions={renderOptions}
        scriptValue={scriptValue}
        setScriptValue={setScriptValue}
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
        <Typography variant="h5">Server log: </Typography>
        <p>{log}</p>
      </div>
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
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
        <Button variant="contained" onClick={onRun}>
          Run
        </Button>
        <Button variant="contained" onClick={onSchedule}>
          Schedule
        </Button>
      </div>
      {scheduleDialog}
    </div>
  );
}
