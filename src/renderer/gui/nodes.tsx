import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function ExecNode({
  data,
}: {
  data: { onChangeData: (newData: Any) => void };
}) {
  const [line, setLine] = useState('');
  const onLineChange = (evt) => {
    setLine(evt.target.value);
    data.onChangeData({ ...data, line: evt.target.value });
  };
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        padding={2}
      >
        <Typography variant="h6">Exec</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Code line"
          variant="outlined"
          value={line}
          onChange={onLineChange}
        />
        <Handle type="source" position={Position.Bottom} id="next" />
        <Handle type="target" position={Position.Top} id="prev" />
      </Box>
    </Paper>
  );
}

export function LoadNode({
  data,
}: {
  data: { onChangeData: (newData: Any) => void };
}) {
  const [url, setUrl] = useState('');
  const onUrlChange = (evt) => {
    setUrl(evt.target.value);
    data.onChangeData({ ...data, url: evt.target.value });
  };
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        padding={2}
      >
        <Typography variant="h6">Load</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="URL"
          variant="outlined"
          value={url}
          onChange={onUrlChange}
        />
        <Handle type="source" position={Position.Bottom} id="next" />
        <Handle type="target" position={Position.Top} id="prev" />
      </Box>
    </Paper>
  );
}

export function PressNode({
  data,
}: {
  data: { onChangeData: (newData: Any) => void };
}) {
  //TODO: dropdown list???
  const [key, setKey] = useState('');
  const onUrlChange = (evt) => {
    setKey(evt.target.value);
    data.onChangeData({ ...data, key: evt.target.value });
  };
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        padding={2}
      >
        <Typography variant="h6">Press</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Key"
          variant="outlined"
          value={key}
          onChange={onUrlChange}
        />
        <Handle type="source" position={Position.Bottom} id="next" />
        <Handle type="target" position={Position.Top} id="prev" />
      </Box>
    </Paper>
  );
}

export function TypeNode({
  data,
}: {
  data: { onChangeData: (newData: Any) => void };
}) {
  const [url, setUrl] = useState('');
  const onUrlChange = (evt) => {
    setUrl(evt.target.value);
    data.onChangeData({ ...data, url: evt.target.value });
  };
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        padding={2}
      >
        <Typography variant="h6">Type</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Code line"
          variant="outlined"
          value={url}
          onChange={onUrlChange}
        />
        <Handle type="source" position={Position.Bottom} id="next" />
        <Handle type="target" position={Position.Top} id="prev" />
      </Box>
    </Paper>
  );
}

export function StartNode() {
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        padding={2}
      >
        <Typography variant="h6">Start</Typography>
        <Handle type="source" position={Position.Bottom} id="next" />
      </Box>
    </Paper>
  );
}
