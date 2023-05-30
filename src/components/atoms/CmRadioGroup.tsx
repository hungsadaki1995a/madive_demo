import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { IOption } from '@/types/common';

import {
  CmRadioGroupLabelStyled,
  CmRadioGroupStyled,
  CmRadioGroupWrapperStyled,
  CmRadioHelperTextStyled,
} from './styled/CmRadioGroupStyled';

export type RadioItemProps<TValue extends string | number | boolean> = IOption<TValue> & {
  disabled?: boolean;
};

type RadioGroupProps<TValue extends string | number | boolean> = {
  title?: string;
  labelWidth?: number;
  data: RadioItemProps<TValue>[];
  value?: TValue;
  onRadioChange: (value: TValue) => void;
  error?: boolean;
  helperText?: string;
};

function CmRadioGroup<TValue extends string | number | boolean>({
  title,
  labelWidth,
  data,
  value,
  onRadioChange,
  error,
  helperText,
}: RadioGroupProps<TValue>) {
  return (
    <CmRadioGroupStyled
      onChange={(e) => {
        onRadioChange((e.target as HTMLInputElement).value as TValue);
      }}
      error={!!error}
    >
      {title && (
        <CmRadioGroupLabelStyled
          id={`radio-buttons-group-label-${title}`}
          width={labelWidth ? labelWidth : 35}
        >
          {title}
        </CmRadioGroupLabelStyled>
      )}
      <CmRadioGroupWrapperStyled>
        <RadioGroup
          row
          aria-labelledby={`radio-buttons-group-label-${title}`}
          name={`radio-buttons-group-${title}`}
          value={value}
        >
          {data.length &&
            data.map((item, idx) => (
              <FormControlLabel
                key={item.value.toString() + idx}
                value={item.value}
                control={<Radio size="small" />}
                label={item.label}
                disabled={!!item.disabled}
              />
            ))}
        </RadioGroup>
        <CmRadioHelperTextStyled>{error && helperText}</CmRadioHelperTextStyled>
      </CmRadioGroupWrapperStyled>
    </CmRadioGroupStyled>
  );
}

export { CmRadioGroup };
