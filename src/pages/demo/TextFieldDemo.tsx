import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Typography } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmTextField } from '@/components/atoms/CmTextField';

class InputDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  input_inside: string;

  @IsNotEmpty({ message: 'This field cannot blank' })
  input_outside: string;
}

const resolver = classValidatorResolver(InputDTO);

function TextFieldDemo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      input_inside: '',
      input_outside: '',
    },
    resolver,
  });

  const onSubmit = handleSubmit((data) => {
    console.log('Radio value at used place', data);
  });

  return (
    <div style={{ width: 600 }}>
      <Typography variant="h6">Controlled form</Typography>
      <Controller
        name={'input_inside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Input with label inside"
            type="inside"
            onChange={onChange}
            value={value}
            error={!!errors?.input_inside}
            helperText={errors?.input_inside?.message?.toString()}
          />
        )}
      />
      <Controller
        name={'input_outside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmTextField
            label="Input with label outside"
            type="outside"
            onChange={onChange}
            value={value}
            error={!!errors?.input_outside}
            helperText={errors?.input_outside?.message}
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
            reset({
              input_inside: '',
              input_outside: '',
            });
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default TextFieldDemo;
