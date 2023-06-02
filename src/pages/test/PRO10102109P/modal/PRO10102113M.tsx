import { Controller, useForm } from 'react-hook-form';

import { IsNotEmpty } from 'class-validator';

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
  return (
    <CmModal
      title="Save Test Case"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
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
