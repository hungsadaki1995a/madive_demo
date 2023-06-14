import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField, Typography } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { CreateDatasource } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

import { IPropertyList } from '@/pages/system-context/PRO10104104P/type';

type CreateDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataProp: IPropertyList;
  resetPageAndRefresh?: () => void;
};

const initialFormData: CreateDatasource = {
  key_parameter: '',
  property_value: '',
};

export default function CreateDatasourceModal({
  visible,
  handleSave,
  handleClose,
  dataProp,
  resetPageAndRefresh,
}: CreateDatasourceModalProps) {
  const resolver = classValidatorResolver(CreateDatasource);

  const handleCloseModal = () => {
    handleClose();
    reset(initialFormData);
  };

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
        onClick={() => {
          handleSave?.();
        }}
      />
    </Box>
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: initialFormData,
    resolver,
  });

  handleSave = handleSubmit(async (data: CreateDatasource) => {
    const respone = await SystemContextApi.addDatasource({
      key_parameter: data.key_parameter,
      logical_name: dataProp?.logical_name as string,
      node_id: dataProp.node_id,
      physical_name: dataProp?.physical_name as string,
      property_key: 'APPLICATION_SYSTEM_CONTEXT_{0}_DATASOURCE',
      property_value: data.property_value,
      resource_id: dataProp.resource_id,
      resource_type: dataProp.resource_type,
    });

    if (respone?.dto?.value !== 'SUCCESS') {
      return;
    }

    resetPageAndRefresh?.();

    handleClose();
    reset(initialFormData);

    notify.success('Create success!');
  });

  return (
    <CmModal
      title="Create Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleCloseModal}
      className="medium"
      footerRenderAs={footerRender}
    >
      <label className="labelFormArea">
        <span>Node</span>
        <Typography className="textData">{dataProp.node_name}</Typography>
      </label>
      <label className="labelFormArea">
        <span>Application</span>
        <Typography className="textData">{dataProp.logical_name}</Typography>
      </label>
      <label className="labelFormArea">
        <span>System Context Name</span>
        <Controller
          name="key_parameter"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="key_parameter"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.key_parameter}
              helperText={errors.key_parameter?.message}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Datasource</span>
        <Controller
          name="property_value"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="property_value"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.property_value}
              helperText={errors.property_value?.message}
            />
          )}
        />
      </label>
    </CmModal>
  );
}
