import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Typography } from '@mui/material';
import { IsNotEmpty } from 'class-validator';

import { CmDropdown } from '@/components/atoms/CmDropDown';

import { formatDropdownData } from '@/utils';

export const FIELD_TYPE = [
  { value: 'boolean' },
  { value: 'char' },
  { value: 'short' },
  { value: 'int' },
  { value: 'long' },
  { value: 'float' },
];

export const META_TYPE = [{ value: 'non-persistent' }, { value: 'persistent' }];

class InputDTO {
  @IsNotEmpty({ message: 'This field cannot blank' })
  label_inside: string;

  @IsNotEmpty({ message: 'This field cannot blank' })
  label_outside: string;

  multiple_choice: string[];
}

const resolver = classValidatorResolver(InputDTO);

function DropDown() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      label_inside: '',
      label_outside: '',
      multiple_choice: [],
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
        name={'label_inside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmDropdown
            label="Label inside"
            error={!!errors.label_inside}
            data={formatDropdownData(META_TYPE, 'value', 'value')}
            helperText={errors.label_inside?.message}
            onChange={onChange}
            type="inside"
            value={value}
          />
        )}
      />
      <Controller
        name={'label_outside'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmDropdown
            data={formatDropdownData(META_TYPE, 'value', 'value')}
            label="Label outside"
            type="outside"
            onChange={onChange}
            value={value}
            error={!!errors?.label_outside}
            helperText={errors?.label_outside?.message?.toString()}
          />
        )}
      />

      <Controller
        name={'multiple_choice'}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CmDropdown
            data={formatDropdownData(META_TYPE, 'value', 'value')}
            label="Multiple choice"
            type="outside"
            onChange={onChange}
            multiple
            value={value}
            error={!!errors?.multiple_choice}
            helperText={errors?.multiple_choice?.message?.toString()}
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
              label_inside: '',
              label_outside: '',
            });
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default DropDown;
