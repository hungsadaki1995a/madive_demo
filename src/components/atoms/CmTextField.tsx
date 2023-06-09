import { forwardRef } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

import { CmFieldLabel } from './Atoms.Styled';
import { CmTextFieldWrapper } from './styled/CmTextField.styled';

type CmTextFieldProps = Omit<
  TextFieldProps,
  'error' | 'label' | 'helperText' | 'type' | 'width' | 'margin' | 'variant'
> & {
  type?: 'inside' | 'outside' | 'withAdornment';
  error?: boolean;
  label?: string;
  helperText?: string;
  width?: string;
  inputWidth?: string;
  labelWidth?: string;
  margin?: string;
  startAdornmentChildren?: React.ReactNode;
  endAdornmentChildren?: React.ReactNode;
  variant?: 'outlined' | 'standard';
  inputType?: string;
};

export const CmTextField = forwardRef(
  (
    {
      error,
      label,
      helperText,
      type = 'outside',
      width,
      inputWidth,
      labelWidth,
      margin,
      startAdornmentChildren,
      endAdornmentChildren,
      variant = 'outlined',
      inputType,
      ...textFieldProps
    }: CmTextFieldProps,
    ref: any
  ) => {
    return (
      <CmTextFieldWrapper
        width={width}
        inputWidth={inputWidth}
        margin={margin}
      >
        {type === 'inside' && (
          <TextField
            {...textFieldProps}
            type={inputType}
            spellCheck="false"
            variant={variant}
            label={label}
            size="small"
            error={!!error}
            helperText={helperText}
          />
        )}

        {type === 'outside' && (
          <>
            <CmFieldLabel width={labelWidth}>{label}</CmFieldLabel>
            <TextField
              {...textFieldProps}
              spellCheck="false"
              ref={ref}
              type={inputType}
              size="small"
              variant={variant}
              error={!!error}
              helperText={helperText}
            />
          </>
        )}

        {type === 'withAdornment' && (
          <>
            <TextField
              {...textFieldProps}
              label={label}
              spellCheck="false"
              error={!!error}
              type={inputType}
              variant={variant}
              ref={ref}
              size="small"
              helperText={helperText}
              InputProps={{
                startAdornment: startAdornmentChildren ? (
                  <InputAdornment position="start">
                    <>{startAdornmentChildren}</>
                  </InputAdornment>
                ) : undefined,

                endAdornment: endAdornmentChildren ? (
                  <InputAdornment position="end">
                    <>{endAdornmentChildren}</>
                  </InputAdornment>
                ) : undefined,
              }}
            />
          </>
        )}
      </CmTextFieldWrapper>
    );
  }
);
