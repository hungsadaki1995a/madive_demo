import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import DbioApi from '@/apis/DbioApi';
import DbioModel from '@/types/models/dbioModel';
import { notify } from '@/utils/notify';

type CreateDbioModalProps = {
  visible: boolean;
  handleClose: () => void;
  aliasId: string;
  fetchTableData: () => void;
};

const defaultValues: DbioModel = {
  alias: '',
  id: '',
  ip: '',
  port: '',
  pw: '',
  vender: '',
};

export default function CreateDbioModal({ visible, handleClose, aliasId, fetchTableData }: CreateDbioModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = classValidatorResolver(DbioModel);

  //Form value
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DbioModel>({ resolver, defaultValues });

  // handle save
  const onSubmit = useCallback(
    async (formData: DbioModel) => {
      setIsLoading(true);
      const res = (await DbioApi.addDbio(formData)) as any;
      setIsLoading(false);
      if (res?.dto?.value !== 'Success') {
        notify.error(res?.dto?.value);
      } else {
        notify.success(res?.dto?.value);
        fetchTableData?.();
        handleClose();
      }
    },
    [fetchTableData]
  );

  // reset form data
  useEffect(() => {
    if (!visible) reset();
  }, [visible]);

  const handleCloseModalBtn = useCallback(() => {
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
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </Box>
  );

  return (
    <CmModal
      title="Create Dbio"
      visible={visible}
      // onSave={handleSave}
      onClose={handleCloseModalBtn}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      {/* Form */}
      <label className="labelFormArea">
        <span>Vender</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('vender')}
          error={!!errors.vender}
          helperText={errors.vender?.message}
          inputProps={{ maxLength: 128 }}
          placeholder="•"
          disabled={isLoading}
        />
      </label>
      <label className="labelFormArea">
        <span>Alias</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('alias')}
          error={!!errors.alias}
          helperText={errors.alias?.message}
          inputProps={{ maxLength: 128 }}
          disabled={isLoading}
          placeholder="•"
        />
      </label>
      <label className="labelFormArea">
        <span>ID</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('id')}
          error={!!errors.id}
          helperText={errors.id?.message}
          disabled={isLoading}
          placeholder="•"
        />
      </label>
      <label className="labelFormArea">
        <span>Password</span>
        <TextField
          className="labelTextField"
          size="small"
          type="password"
          {...register('pw')}
          error={!!errors.pw}
          helperText={errors.pw?.message}
          inputProps={{ maxLength: 128 }}
          disabled={isLoading}
          placeholder="•"
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('ip')}
          error={!!errors.ip}
          helperText={errors.ip?.message}
          inputProps={{ maxLength: 128 }}
          disabled={isLoading}
          placeholder="•"
        />
      </label>
      <label className="labelFormArea">
        <span>Port</span>
        <TextField
          className="labelTextField"
          size="small"
          {...register('port')}
          error={!!errors.port}
          helperText={errors.port?.message}
          inputProps={{ maxLength: 5 }}
          disabled={isLoading}
          placeholder="•"
        />
      </label>
    </CmModal>
  );
}
