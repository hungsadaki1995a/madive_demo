import { styled } from '@mui/material';

//Drop Down wrapper
const CmDropDownWrapper = styled('div')(
  ({ inputWidth, width, margin }: { inputWidth?: string; width?: string; margin?: string }) => ({
    display: 'flex',
    flexDirection: 'row',
    margin: margin ? margin : '12px 0px',
    width: width ? width : 'none',

    // container of textfield
    '& .MuiTextField-root': {
      flex: 1,
    },

    //Field input
    '& .MuiInputBase-input': {
      padding: '4px 10px',
      color: '#555',
      fontSize: 14,
    },

    // width of text field
    '& .MuiInputBase-root': {
      width: inputWidth ? inputWidth : '100%',
    },

    //select text font size
    '& .MuiSelect-select': {
      fontSize: '14px',
    },

    //disable color
    '& .Mui-disabled': {
      backgroundColor: '#f1f1f1',
    },

    //
    '& .MuiFormControl-root': {
      width: inputWidth ? inputWidth : '100%',
    },
  })
);

export { CmDropDownWrapper };
