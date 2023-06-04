import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmButton } from '@/components/atoms/CmButton';
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

  return (
    <CmModal
      title="Edit Node"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
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
