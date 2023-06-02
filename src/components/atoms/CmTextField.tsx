import { TextField, TextFieldProps } from '@mui/material';

import { CmFieldLabel } from './Atoms.Styled';
import { CmTextFieldWrapper } from './styled/CmTextField.styled';

type CmTextFieldProps = Omit<TextFieldProps, 'error' | 'label' | 'helperText' | 'type' | 'width' | 'margin'> & {
  type?: 'inside' | 'outside';
  error?: boolean;
  label?: string;
  helperText?: string;
  width?: string;
  inputWidth?: string;
  labelWidth?: string;
  margin?: string;
  inputType?: string;
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
  inputType,
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
          type={inputType}
          spellCheck="false"
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
            type={inputType}
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
