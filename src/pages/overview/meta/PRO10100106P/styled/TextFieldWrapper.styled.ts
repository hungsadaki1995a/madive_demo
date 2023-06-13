import { styled } from '@mui/material';

export const TextFieldWrapper = styled('div')(() => ({
  //disable color
  '& .Mui-disabled': {
    backgroundColor: '#f1f1f1 !important',
  },
}));
