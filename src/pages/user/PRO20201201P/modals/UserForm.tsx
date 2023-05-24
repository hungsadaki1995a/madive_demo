import { IPlainObject } from '@/components/organisms/CmCommonTable/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CmDialogTextField } from '@/components/molecules/CmFormFields/CmDialogTextField';
import UserModel from '@/types/models/userModel';

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-container': {
      minWidth: 695,
    },
  },
  dialogTitle: {
    '& h2': {
      fontSize: 16,
      fontWeight: 600,
      color: '#444',
    },
  },
  divider: {
    margin: '0px 20px',
  },
  dialogContent: {
    overflowX: 'hidden',
    '& p': {
      display: 'flex',
      alignItems: 'center',
      width: 175,
      fontSize: 14,
      margin: 0,
    },
    '& input': {
      padding: '5px 10px',
      width: 312,
      fontSize: 14,
      color: '#555',
    },
    '& input[type=radio]': {
      width: 'fit-content',
    },
    '& .Mui-disabled[type=text]': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '& .Mui-disabled[role=button]': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
}));

export type UserFormRefType = {
  show: (storedData?: UserModel) => void;
  hide: () => void;
};

const defaultValues: UserModel = {
  user_id: '00_',
  user_passwd: '',
  user_name: '',
  user_div: '',
  email: '',
  tel_no: '',
};

interface IUserFormProps<TData extends IPlainObject> {
  header: string;
  submitLabel: string;
  cancelLabel: string;
  onSubmit: (data: TData) => Promise<void>;
  disabledFields?: string[];
}

const resolver = classValidatorResolver(UserModel);

const UserForm = (
  { header, submitLabel, cancelLabel, onSubmit, disabledFields }: IUserFormProps<UserModel>,
  ref: React.Ref<UserFormRefType>
) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const disabledMapping = useMemo(() => {
    return (
      disabledFields?.reduce((obj: IPlainObject, fieldName) => {
        obj[fieldName] = true;
        return obj;
      }, {} as IPlainObject) || {}
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserModel>({ resolver, defaultValues });

  const handleShow = (storedData?: UserModel) => {
    if (storedData) {
      reset(storedData);
    }
    setOpen(true);
  };

  const handleHide = useCallback(() => {
    reset(defaultValues);
    setOpen(false);
  }, [reset]);

  const submitForm = useCallback(
    async (formData: UserModel) => {
      await onSubmit(formData);
      handleHide();
    },
    [onSubmit, handleHide]
  );

  useImperativeHandle(ref, (): UserFormRefType => {
    return {
      show: handleShow,
      hide: handleHide,
    };
  });

  return (
    <Dialog
      className={classes.dialog}
      maxWidth="md"
      open={open}
      onClose={handleHide}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.dialogTitle}>{header}</DialogTitle>
      <Divider className={classes.divider} />
      <DialogContent className={classes.dialogContent}>
        <CmDialogTextField
          label="User ID*"
          {...register('user_id')}
          error={errors.user_id}
          disabled={disabledMapping['userId']}
        />
        <CmDialogTextField label="Password*" {...register('user_passwd')} error={errors.user_passwd} />
        <CmDialogTextField label="Name*" {...register('user_name')} error={errors.user_name} />
        <CmDialogTextField label="User Div*" {...register('user_div')} error={errors.user_div} />
        <CmDialogTextField label="E-mail*" {...register('email')} error={errors.email} />
        <CmDialogTextField label="Telephone No.*" {...register('tel_no')} error={errors.tel_no} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(submitForm)} type="submit" color="primary" variant="contained">
          {submitLabel}
        </Button>
        <Button color="inherit" onClick={handleHide} variant="contained">
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default forwardRef(UserForm);
