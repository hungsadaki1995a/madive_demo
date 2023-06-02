import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { TextField } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

// Common Atoms
import { CmDataSelect } from '@/components/atoms/CmDataInput';
import CmModal from '@/components/atoms/CmModal';
import { CmRadioGroup, RadioItemProps } from '@/components/atoms/CmRadioGroup';

const data1: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'true',
    label: 'true',
  },
  {
    value: 'false',
    label: 'false',
  },
];

class RadioDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  SSL: string;
  Primary: string;
  Masking: string;
  Encrypt: string;
  Use: string;
  input_outside: string;
}
type EditNodeModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};
const resolver = classValidatorResolver(RadioDTO);
type propsType = {
  title: string;
};

export default function EditNodeModal({ visible, handleSave, handleClose }: EditNodeModalProps) {
  const {
    control,
    formState: { errors },
  } = useForm({
    values: {
      SSL: '',
    },
    resolver,
  });
  return (
    <CmModal
      title="Edit Node"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Node Name</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>File Port</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Http Port</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>ProObject Port</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>SSL</span>
        <Controller
          name={'SSL'}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CmRadioGroup
              data={data1}
              value={value}
              onRadioChange={onChange}
              error={!!errors.SSL}
              helperText={errors.SSL?.message?.toString()}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Node Type</span>
        <CmDataSelect className="" />
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
