import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box } from '@material-ui/core';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { CmTextField } from '@/components/atoms/CmTextField';

import { configUserDto } from '@/types/dtos/userDto';
import UserModel from '@/types/models/userModel';

type CreateModalProps = {
  visible: boolean;
  handleSave: (data: configUserDto) => Promise<void>;
  handleClose: () => void;
  data: configUserDto | null;
};

const defaultValues: UserModel = {
  user_id: '',
  user_passwd: '',
  user_name: '',
  user_div: '',
  email: '',
  tel_no: '',
};

const resolver = classValidatorResolver(UserModel);

const FormModal = ({ visible, handleSave, handleClose, data }: CreateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserModel>({ resolver, defaultValues });

  const onSubmit = useCallback(
    async (formData: UserModel) => {
      await handleSave(formData as configUserDto);
      reset(defaultValues);
      handleClose();
    },
    [handleSave, reset]
  );

  const onClose = () => {
    reset(defaultValues);
    handleClose();
  };

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="contained"
        btnTitle={data ? 'Update' : 'Create'}
        startIcon={<></>}
        className=""
        onClick={handleSubmit(onSubmit)}
      />
      <CmButton
        id="rightBtn2"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={onClose}
      />
    </Box>
  );

  useEffect(() => {
    reset({ ...data });
    return () => reset({ ...defaultValues });
  }, [handleSave]);

  return (
    <>
      <CmModal
        title={data ? 'Update User' : 'Create User'}
        visible={visible}
        onSave={handleSubmit(onSubmit)}
        onClose={onClose}
        className="medium"
        footerRenderAs={footerRender}
      >
        <CmTextField
          label="User ID*"
          type="outside"
          placeholder="*"
          {...register('user_id')}
          error={!!errors.user_id}
          helperText={errors.user_id?.message?.toString()}
          disabled={!!data}
        />
        <CmTextField
          label="Password*"
          type="outside"
          placeholder="*"
          {...register('user_passwd')}
          error={!!errors.user_passwd}
          helperText={errors.user_passwd?.message?.toString()}
        />
        <CmTextField
          label="Name*"
          type="outside"
          placeholder="*"
          {...register('user_name')}
          error={!!errors.user_name}
          helperText={errors.user_name?.message?.toString()}
        />
        <CmTextField
          label="User Div*"
          type="outside"
          placeholder="*"
          {...register('user_div')}
          error={!!errors.user_div}
          helperText={errors.user_div?.message?.toString()}
        />
        <CmTextField
          label="E-mail*"
          type="outside"
          placeholder="*"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <CmTextField
          label="Telephone No.*"
          type="outside"
          placeholder="*"
          {...register('tel_no')}
          error={!!errors.tel_no}
          helperText={errors.tel_no?.message?.toString()}
        />
      </CmModal>
    </>
  );
};

export default FormModal;
