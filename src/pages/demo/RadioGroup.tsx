import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmRadioGroup, RadioItemProps } from '@/components/atoms/CmRadioGroup';

const data: RadioItemProps<string | number | boolean>[] = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
];

class RadioDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  sex: string;
}

const resolver = classValidatorResolver(RadioDTO);

function RadioGroup() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      sex: '',
    },
    resolver,
  });

  const onSubmit = handleSubmit((value) => {
    console.log('Radio value at used place', value);
  });

  return (
    <div style={{ width: 600 }}>
      <Controller
        name={'sex'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmRadioGroup
            title={'Gender'}
            data={data}
            value={value}
            onRadioChange={onChange}
            error={!!errors.sex}
            helperText={errors.sex?.message?.toString()}
          />
        )}
      />
      <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          type="reset"
          variant="text"
          onClick={() => {
            reset({ sex: '' });
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default RadioGroup;
