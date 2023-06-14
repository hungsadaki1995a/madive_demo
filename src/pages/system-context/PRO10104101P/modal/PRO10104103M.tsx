import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { CreateKey } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

import { EditModal } from '@/pages/system-context/PRO10104101P/type';

type EditSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataProp: EditModal;
  resetPageAndRefresh?: () => void;
};

export default function EditSystemContextModal({
  visible,
  handleSave,
  handleClose,
  dataProp,
  resetPageAndRefresh,
}: EditSystemContextModalProps) {
  const resolver = classValidatorResolver(CreateKey);

  const { key, value } = dataProp;

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: { key, value },
    resolver,
  });

  handleSave = handleSubmit(async (data: CreateKey) => {
    const response = await SystemContextApi.editSystemContext({
      appName: dataProp.appName as string,
      key: data.key,
      node_id: dataProp.node_id,
      resource_id: dataProp.resource_id,
      systemContextName: dataProp.systemContextName,
      value: data.value,
    });

    if (response?.dto?.value !== 'SUCCESS') {
      return;
    }

    resetPageAndRefresh?.();
    handleClose();

    notify.success('Edit success!');
  });

  return (
    <CmModal
      title="Edit System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <label className="labelFormArea">
        <span>
          {dataProp.appName} - {dataProp.systemContextName}
        </span>
      </label>
      <label className="labelFormArea">
        <span>key</span>
        <TextField
          className="labelTextField"
          defaultValue={dataProp.key}
          disabled
          size="small"
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
              defaultValue={dataProp.value}
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
