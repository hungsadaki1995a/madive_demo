import { styled } from '@mui/material';

//Text Field wrapper
export const CmTextAreaWrapper = styled('div')(() => ({
  //disable color
  '& .Mui-disabled': {
    backgroundColor: '#f1f1f1',
    color: 'black !important',
    fontSize: '14px',
    '-webkit-text-fill-color': 'black',
  },
}));
