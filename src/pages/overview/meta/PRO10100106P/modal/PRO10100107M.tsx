import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { TextField } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmDataSelect } from '@/components/atoms/CmDataInput';
// Common Atoms
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup, RadioItemProps } from '@/components/atoms/CmRadioGroup';

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
    },
    resolver,
  });

  const onSubmit = handleSubmit((value) => {
    console.log('Radio value at used place', value);
  });
  return (
    <CmModal
      title="Create Meta Field"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
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
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Type</span>
        <Controller
          name={'Type'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              // title={'Gender'}
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
              // title={'Gender'}
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
        <span>Package</span>
        <TextField
          className="labelTextField"
          defaultValue="test"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </label>
    </CmModal>
  );
}
