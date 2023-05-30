import { FormControl, FormControlLabel, FormLabel, RadioGroup, styled } from '@mui/material';

interface ICmRadioGroup {
  width?: string;
}

const CmRadioGroupStyled = styled(FormControl)(() => ({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
}));

const CmRadioGroupLabelStyled = styled(FormLabel)<ICmRadioGroup>(({ width }) => ({
  width: width ? width : '100%',
}));

const CmRadioGroupButtonsStyled = styled(RadioGroup)<ICmRadioGroup>(({ width }) => ({
  width: width ? width : '100%',
}));

const CmRadioItemStyled = styled(FormControlLabel)();

export { CmRadioGroupStyled, CmRadioGroupLabelStyled, CmRadioGroupButtonsStyled, CmRadioItemStyled };
