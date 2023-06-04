import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmButton } from '@/components/atoms/CmButton';
import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Common Atoms
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup, RadioItemProps } from '@/components/atoms/CmRadioGroup';
import { CmTextField } from '@/components/atoms/CmTextField';

const data1: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'non-persistent',
    label: 'non-persistent',
  },
  {
    value: 'persistent',
    label: 'persistent',
  },
];
const data2: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'yes',
    label: 'yes',
    disabled: true,
  },
  {
    value: 'no',
    label: 'no',
    disabled: true,
  },
];
const data3: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'Use',
    label: 'Use',
    disabled: true,
  },
  {
    value: 'Unuse',
    label: 'Unuse',
    disabled: true,
  },
];
const data4: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'yes',
    label: 'yes',
  },
  {
    value: 'no',
    label: 'no',
  },
];

class RadioDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  Type: string;
  Primary: string;
  Masking: string;
  Encrypt: string;
  Use: string;
  input_outside: string;
}

const resolver = classValidatorResolver(RadioDTO);

type CreateMetaModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateMetaModal({ visible, handleSave, handleClose }: CreateMetaModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      Type: '',
      Primary: '',
      Masking: '',
      Encrypt: '',
      Use: '',
      input_outside: '',
    },
    resolver,
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
        onClick={handleClose}
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
      title="Create Meta Field"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Physical Name</span>
        <TextField
          className="labelTextField"
          defaultValue="Luke Test"
          size="small"
        />
        {/* <TextField disabled defaultValue="Luke Test" hiddenLabel size="small" /> */}
      </label>
      <label className="labelFormArea">
        <span>Logical Name</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Resource Group</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Comments</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Feild Type</span>
        <CmDataSelect className="" />
      </label>
      <label className="labelFormArea">
        <span>Length</span>
        <Box className="formRow">
          <TextField
            className="labelTextField"
            size="small"
          />
          <TextField
            className="labelTextField"
            size="small"
            disabled
          />
        </Box>
      </label>
      <label className="labelFormArea">
        <span>Type</span>
        <Controller
          name={'Type'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={data1}
              value={value}
              onRadioChange={onChange}
              error={!!errors.Type}
              helperText={errors.Type?.message?.toString()}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Primary Key</span>
        <Controller
          name={'Primary'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={data2}
              value={value}
              onRadioChange={onChange}
              error={!!errors.Primary}
              helperText={errors.Primary?.message?.toString()}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>DataSource</span>
        <TextField
          className="labelTextField"
          size="small"
          disabled
        />
      </label>
      <label className="labelFormArea">
        <span>Table</span>
        <TextField
          className="labelTextField"
          size="small"
          disabled
        />
      </label>
      <label className="labelFormArea">
        <span>Column</span>
        <TextField
          className="labelTextField"
          size="small"
          disabled
        />
      </label>
      <label className="labelFormArea">
        <span>Masking</span>
        <Box className="formColumn">
          <Controller
            name={'Masking'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmRadioGroup
                data={data3}
                value={value}
                onRadioChange={onChange}
                error={!!errors.Masking}
                helperText={errors.Masking?.message?.toString()}
              />
            )}
          />
          <Controller
            name={'input_outside'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CmTextField
                label="Range"
                type="outside"
                onChange={onChange}
                value={value}
                error={!!errors?.input_outside}
                helperText={errors?.input_outside?.message}
              />
            )}
          />
        </Box>
      </label>
      <label className="labelFormArea">
        <span>Encrypt</span>
        <Controller
          name={'Encrypt'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={data3}
              value={value}
              onRadioChange={onChange}
              error={!!errors.Encrypt}
              helperText={errors.Encrypt?.message?.toString()}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Default Value</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Use</span>
        <Controller
          name={'Use'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={data4}
              value={value}
              onRadioChange={onChange}
              error={!!errors.Use}
              helperText={errors.Use?.message?.toString()}
            />
          )}
        />
      </label>
    </CmModal>
  );
}
