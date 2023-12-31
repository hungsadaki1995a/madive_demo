import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select, SelectProps } from '@mui/material';

import { DropdownType } from '@/types/common';

import { CmFieldLabel } from './Atoms.Styled';
import { CmDropDownWrapper } from './styled/CmDropDown.styled';

type CmDropdownProps = Omit<SelectProps, 'error' | 'margin' | 'multiple' | 'type' | 'helperText'> & {
  error?: boolean;
  data: DropdownType[];
  inputWidth?: string;
  width?: string;
  margin?: string;
  labelWidth?: string;
  multiple?: boolean;
  type?: 'inside' | 'outside';
  helperText?: string;
  labelFontSize?: string;
};

export const CmDropdown = (props: CmDropdownProps) => {
  const {
    label,
    type = 'outside',
    error,
    data,
    inputWidth,
    disabled,
    margin,
    width,
    labelWidth,
    multiple = false,
    helperText,
    labelFontSize,
    ...otherProps
  } = props;

  return (
    <CmDropDownWrapper
      inputWidth={inputWidth}
      margin={margin}
      width={width}
    >
      {type === 'outside' && (
        <CmFieldLabel
          width={labelWidth}
          fontSize={labelFontSize}
        >
          {label}
        </CmFieldLabel>
      )}

      <FormControl
        error={!!error}
        size="small"
      >
        {type === 'inside' && (
          <CmFieldLabel
            width={labelWidth}
            fontSize={labelFontSize}
          >
            {label}
          </CmFieldLabel>
        )}
        <Select
          {...otherProps}
          spellCheck="false"
          error={error}
          displayEmpty
          multiple={multiple}
          disabled={disabled}
          input={type === 'inside' ? <OutlinedInput label={label} /> : undefined}
        >
          {!!data?.length &&
            data?.map((item, index) => {
              if (item.label && item.value !== '') {
                return (
                  <MenuItem
                    key={item.value.toString() + index}
                    value={item.value || ''}
                    style={{ fontFamily: 'NotoSansCJKRegular', fontSize: 13 }}
                  >
                    {item.label}
                  </MenuItem>
                );
              }
            })}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </CmDropDownWrapper>
  );
};
