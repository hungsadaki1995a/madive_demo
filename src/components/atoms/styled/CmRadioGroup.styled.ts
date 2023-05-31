import { FormControl, FormHelperText, FormLabel, styled } from '@mui/material';

interface ICmRadioGroup {
  width?: number;
}

const CmRadioGroupStyled = styled(FormControl)(() => ({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
}));

const CmRadioGroupLabelStyled = styled(FormLabel)<ICmRadioGroup>(({ width }) => ({
  width: width && Number(width) < 100 ? width + '%' : '100%',
}));

const CmRadioGroupWrapperStyled = styled('div')(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const CmRadioHelperTextStyled = styled(FormHelperText)(() => ({
  margin: 0,
  padding: 0,
}));

export { CmRadioGroupStyled, CmRadioGroupLabelStyled, CmRadioGroupWrapperStyled, CmRadioHelperTextStyled };
