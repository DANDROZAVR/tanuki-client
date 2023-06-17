import { React, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function TextDialog({
  onSubmit,
  onCancel,
  open,
  title,
  label,
}: {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (val: string) => void;
  onCancel: () => void;
  open: boolean;
  title: string;
  label: string;
}) {
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    onSubmit(value);
  };

  const handleCancel = () => {
    setValue('');
    onCancel();
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function RequestFieldAndButton({
  id,
  placeholder,
  buttonText,
  callback,
}: {
  id: string;
  placeholder: string;
  buttonText: string;
  callback;
}) {
  const [textValue, setTextValue] = useState('');
  return (
    <>
      <input
        id={id}
        value={textValue}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <button type="button" onClick={() => callback(textValue)}>
        {buttonText}
      </button>
    </>
  );
}

export function FunctionButton({
  id,
  buttonText,
  placeholder,
  onClick,
}: {
  id: string;
  buttonText: string;
  placeholder: string;
  onClick: any;
}) {
  const [contents, setContents] = useState('');
  return (
    <section className="form-section">
      <input
        id={id}
        value={contents}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setContents(e.target.value)}
      />
      <button type="button" onClick={() => onClick(contents)}>
        {buttonText}
      </button>
    </section>
  );
}
