import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  dialogBox: {
    width: '100%',
    paddingBottom: '20px',
    display: 'flex',
    '& > span:not(style)': {
      fontSize: '13px',
      color: '#7a828e',
      paddingTop: '4px',
    },
    '& .MuiTextField-root': {
      marginLeft: 'auto',
      width: '65%',
      '& .MuiOutlinedInput-input': {
        height: '25px',
        padding: '1px 8px 2px',
        fontSize: '13px',
      },
    },

    '& :disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '& .Mui-disabled[type=text]': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '& .Mui-disabled[role=button]': {
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
    // <div className={classes.dialogBox}>
    //   <DialogContentText className={classes.dialogTitle}>{label}</DialogContentText>
    //   <TextField
    //     {...otherProps}
    //     ref={ref}
    //     spellCheck="false"
    //     error={!!error}
    //     helperText={error?.message}
    //   />
    // </div>
    <label className={classes.dialogBox}>
      <span>{label}</span>
      <TextField
        size="small"
        {...otherProps}
        ref={ref}
        spellCheck="false"
        error={!!error}
        helperText={error?.message}
      />
    </label>
  );
});
