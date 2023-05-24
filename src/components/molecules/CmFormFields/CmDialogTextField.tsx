import { TextField, DialogContentText, TextFieldProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  dialogTitle: {
    '& h2': {
      fontSize: 16,
      fontWeight: 600,
      color: '#444',
    },
  },
  dialogBox: {
    display: 'flex',
    margin: '12px 35px',
    '& :disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
}));

type CmDialogTextFieldProps = Omit<TextFieldProps, 'error'> & {
  error?: FieldError | undefined;
};

export const CmDialogTextField = forwardRef((props: CmDialogTextFieldProps, ref: any) => {
  const { label, error, ...otherProps } = props;
  const classes = useStyles();

  return (
    <div className={classes.dialogBox}>
      <DialogContentText className={classes.dialogTitle}>{label}</DialogContentText>
      <TextField {...otherProps} ref={ref} spellCheck="false" error={!!error} helperText={error?.message} />
    </div>
  );
});
