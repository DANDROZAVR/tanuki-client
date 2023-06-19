import { React, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
  const [error, setError] = useState(false);

  const validate = (value: string) =>
    /^[a-zA-Z0-9_]*$/.test(value) && value.length > 0 && value.length < 25;

  const handleSubmit = () => {
    if (!validate(value)) {
      setError(true);
    } else {
      setValue('');
      onSubmit(value);
    }
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
          error={error}
          autoFocus
          margin="dense"
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          helperText={
            error
              ? 'Name should contain up to 24 alphanumeric symbols or undersores'
              : ''
          }
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

export function DateTimeDialog({
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
  const [value, setValue] = useState<Dayjs?>(dayjs());
  const handleSubmit = () => {
    setValue('');
    onSubmit(value.format('M/D/YYYY, h:m:s A'));
  };

  const handleCancel = () => {
    setValue('');
    onCancel();
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={label}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Schedule
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

export function ErrorSnackbar({
  open,
  setOpen,
  message,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (val: boolean) => void;
  message: string;
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="error"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
