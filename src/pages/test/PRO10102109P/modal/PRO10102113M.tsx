import { Controller, useForm } from 'react-hook-form';

import { Box } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { CmTextField } from '@/components/atoms/CmTextField';

class InputDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  input_outside: string;
}
type SaveTestCaseModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function SaveTestCaseModal({ visible, handleSave, handleClose }: SaveTestCaseModalProps) {
  const {
    control,
    formState: { errors },
  } = useForm({
    values: {
      input_outside: '',
    },
    // resolver,
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
      title="Save Test Case"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <Controller
        name={'input_outside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Test Case Name"
            type="outside"
            onChange={onChange}
            value={value}
            error={!!errors?.input_outside}
            helperText={errors?.input_outside?.message}
          />
        )}
      />
    </CmModal>
  );
}
