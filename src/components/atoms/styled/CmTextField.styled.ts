import { InputLabel, styled } from '@mui/material';

//Text Field wrapper
const CmTextFieldWrapper = styled('div')(
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
      padding: '5px 10px',
      color: '#555',
      fontSize: 10,
    },

    // width of text field
    '& .MuiInputBase-root': {
      width: inputWidth ? inputWidth : '100%',
    },

    '& .MuiOutlinedInput-root': {
      padding: '5px 10px',
    },

    //select text font size
    '& .MuiSelect-select': {
      fontSize: '14px',
    },

    //disable color
    '& .Mui-disabled': {
      backgroundColor: '#f1f1f1',
    },
  })
);

// Text field label
const CmContentFieldLabel = styled(InputLabel)(({ width }: { width?: string }) => ({
  width: width || '35%',
  display: 'flex',
  alignItems: 'center',
}));

export { CmContentFieldLabel, CmTextFieldWrapper };
