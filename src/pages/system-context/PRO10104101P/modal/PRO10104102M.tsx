import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { CreateKey } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

import { ISystemContextList } from '@/pages/system-context/PRO10104101P/type';

const initialFormData: CreateKey = {
  key: '',
  value: '',
};

type AddSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataProp: ISystemContextList;
  resetPageAndRefresh?: () => void;
};

export default function AddSystemContextModal({
  visible,
  handleSave,
  handleClose,
  dataProp,
  resetPageAndRefresh,
}: AddSystemContextModalProps) {
  const resolver = classValidatorResolver(CreateKey);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: initialFormData,
    resolver,
  });

  const handleCloseModal = () => {
    handleClose();
    reset(initialFormData);
  };

  handleSave = handleSubmit(async (data: CreateKey) => {
    const response = await SystemContextApi.addSystemContext({
      appName: dataProp.appName as string,
      key: data.key,
      node_id: dataProp.node_id,
      resource_id: dataProp.resource_id,
      systemContextName: dataProp.systemContextName,
      value: data.value,
    });

    if (response?.dto?.value !== 'Success') {
      if (response?.dto?.value === 'Duplication') {
        notify.error('Duplication!');
        return;
      }
      return;
    }

    resetPageAndRefresh?.();

    handleClose();
    reset(initialFormData);

    notify.success('Create success!');
  });

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleCloseModal}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Add System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleCloseModal}
      className="medium"
      footerRenderAs={footerRender}
    >
      <label className="labelFormArea">
        <span>SHApp - SYSTEM CONTEXT TEST</span>
      </label>
      <label className="labelFormArea">
        <span>Key</span>
        <Controller
          name="key"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="key"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.key}
              helperText={errors.key?.message}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Value</span>
        <Controller
          name="value"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="value"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.value}
              helperText={errors.value?.message}
            />
          )}
        />
      </label>
    </CmModal>
  );
}
