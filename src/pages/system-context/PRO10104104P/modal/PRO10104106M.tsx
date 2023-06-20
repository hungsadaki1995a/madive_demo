import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField, Typography } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { CreateDatasource, EditDatasourceResquest } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

type EditDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataProp: EditDatasourceResquest;
  resetPageAndRefresh?: () => void;
};

export default function EditDatasourceModal({
  visible,
  handleSave,
  handleClose,
  dataProp,
  resetPageAndRefresh,
}: EditDatasourceModalProps) {
  const resolver = classValidatorResolver(CreateDatasource);

  const { key_parameter, property_value } = dataProp;

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
        onClick={handleSave}
      />
    </Box>
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: { key_parameter, property_value },
    resolver,
  });

  handleSave = handleSubmit(async (data: CreateDatasource) => {
    const respone = await SystemContextApi.editDataResource({
      key_parameter: dataProp.key_parameter,
      node_id: dataProp.node_id,
      physical_name: dataProp.physical_name,
      property_key: dataProp.property_key,
      property_value: data.property_value,
      resource_id: dataProp.resource_id,
      resource_type: dataProp.resource_type,
    });

    if (respone?.dto?.value !== 'SUCCESS') {
      return;
    }

    resetPageAndRefresh?.();
    handleClose();

    notify.success('Edit success!');
  });

  return (
    <CmModal
      title="Edit Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <label className="labelFormArea">
        <span>System Context Name</span>
        <Typography className="textData">{dataProp.key_parameter}</Typography>
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
              defaultValue={dataProp.property_value}
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
