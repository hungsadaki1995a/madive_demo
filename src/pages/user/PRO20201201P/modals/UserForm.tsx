import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import { CmDialogTextField } from '@/components/molecules/CmFormFields/CmDialogTextField';
import { IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { ReactComponent as ModalClose } from '@/stylesheets/images/modalClose.svg';
import UserModel from '@/types/models/userModel';

const useStyles = makeStyles(() => ({
  dialog: {
    '& *[role="dialog"]': {
      width: '560px',
      margin: 0,
    },
    '& .MuiDialogActions-root': {
      padding: '20px',
    },
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    fontSize: '16px',
    fontWeight: '400',
  },
  dialogContent: {
    overflowX: 'hidden',
    padding: '0 20px',
    '& input[type=radio]': {
      width: 'fit-content',
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
      <DialogTitle className={classes.dialogTitle}>
        {header}
        <CmIconButton
          btnTitle=""
          iconName={<ModalClose />}
          onClick={handleHide}
        />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <CmDialogTextField
          label="User ID*"
          {...register('user_id')}
          error={errors.user_id}
          disabled={disabledMapping['userId']}
        />
        <CmDialogTextField
          label="Password*"
          {...register('user_passwd')}
          error={errors.user_passwd}
        />
        <CmDialogTextField
          label="Name*"
          {...register('user_name')}
          error={errors.user_name}
        />
        <CmDialogTextField
          label="User Div*"
          {...register('user_div')}
          error={errors.user_div}
        />
        <CmDialogTextField
          label="E-mail*"
          {...register('email')}
          error={errors.email}
        />
        <CmDialogTextField
          label="Telephone No.*"
          {...register('tel_no')}
          error={errors.tel_no}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button
          onClick={handleSubmit(submitForm)}
          type="submit"
          color="primary"
          variant="contained"
        >
          {submitLabel}
        </Button>
        <Button
          color="inherit"
          onClick={handleHide}
          variant="contained"
        >
          {cancelLabel}
        </Button> */}

        <Box className="alignL">
          <CmButton
            variant="contained"
            btnTitle={submitLabel}
            startIcon={<></>}
            className=""
            onClick={handleSubmit(submitForm)}
          />
          <CmButton
            variant="text"
            btnTitle={cancelLabel}
            startIcon={<></>}
            className=""
            onClick={handleHide}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default forwardRef(UserForm);
