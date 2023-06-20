import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import { RoleApi } from '@/apis';
import RoleModel from '@/types/models/roleModel';
import { notify } from '@/utils/notify';

type CreateRoleModalProps = {
  visible: boolean;
  handleClose: () => void;
  fetchTableData: () => void;
};

const defaultValues: RoleModel = {
  description: '',
  role_id: '',
  role_name: '',
};

export default function CreateRoleModal({ visible, handleClose, fetchTableData }: CreateRoleModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = classValidatorResolver(RoleModel);

  //Form value
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoleModel>({ resolver, defaultValues });

  const handleCreate = useCallback(
    async (formData: RoleModel) => {
      setIsLoading(true);
      try {
        const res = (await RoleApi.addRole(formData)) as any;
        if (res?.dto?.value === 'Success') {
          notify.success(res?.dto?.value);
          fetchTableData?.();
          handleClose();
        } else notify.error(res?.dto?.value);
      } catch (error) {
        notify.error(error?.data?.exception?.message);
      }
      setIsLoading(false);
    },
    [fetchTableData]
  );

  useEffect(() => {
    if (!visible) reset();
  }, [visible]);

  const handleCloseBtn = useCallback(() => {
    if (!isLoading) handleClose();
  }, [isLoading]);

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={handleClose}
        disabled={isLoading}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleSubmit(handleCreate)}
        disabled={isLoading}
      />
    </Box>
  );

  return (
    <CmModal
      title="Create Role"
      visible={visible}
      onClose={handleCloseBtn}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Role ID</span>
        <TextField
          className="labelTextField"
          {...register('role_id')}
          placeholder="&bull;"
          size="small"
          error={!!errors.role_id}
          helperText={errors.role_id?.message}
          inputProps={{ maxLength: 128 }}
          disabled={isLoading}
        />
      </label>
      <label className="labelFormArea">
        <span>Role Name</span>
        <TextField
          className="labelTextField"
          {...register('role_name')}
          placeholder="&bull;"
          size="small"
          error={!!errors.role_name}
          helperText={errors.role_name?.message}
          inputProps={{ maxLength: 128 }}
          disabled={isLoading}
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          {...register('description')}
          placeholder="&bull;"
          size="small"
          error={!!errors.description}
          helperText={errors.description?.message}
          inputProps={{ maxLength: 1028 }}
          disabled={isLoading}
        />
      </label>
    </CmModal>
  );
}
