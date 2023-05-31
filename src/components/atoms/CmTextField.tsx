import { TextField, TextFieldProps } from '@mui/material';

import { CmContentFieldLabel, CmTextFieldWrapper } from './styled/CmTextField.styled';

type CmTextFieldProps = Omit<TextFieldProps, 'error' | 'label' | 'helperText' | 'type' | 'width' | 'margin'> & {
  type?: 'inside' | 'outside';
  error?: boolean;
  label?: string;
  helperText?: string;
  width?: string;
  inputWidth?: string;
  labelWidth?: string;
  margin?: string;
};

export const CmTextField = ({
  error,
  label,
  helperText,
  type = 'outside',
  width,
  inputWidth,
  labelWidth,
  margin,
  ...textFieldProps
}: CmTextFieldProps) => {
  return (
    <CmTextFieldWrapper
      width={width}
      inputWidth={inputWidth}
      margin={margin}
    >
      {type === 'inside' && (
        <TextField
          {...textFieldProps}
          spellCheck="false"
          label={label}
          size="small"
          error={!!error}
          helperText={helperText}
        />
      )}

      {type === 'outside' && (
        <>
          <CmContentFieldLabel width={labelWidth}>{label}</CmContentFieldLabel>
          <TextField
            {...textFieldProps}
            spellCheck="false"
            size="small"
            error={!!error}
            helperText={helperText}
          />
        </>
      )}
    </CmTextFieldWrapper>
  );
};