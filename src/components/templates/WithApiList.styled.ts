import { Box, styled, Typography } from '@mui/material';

import { CmDataSelect } from '../atoms/CmDataInput';

const Wrapper = styled(Box)(() => ({
  width: '100%',
}));

const ContentWrapper = styled(Box)(() => ({
  //
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '15px',
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: '10px',
}));

const CmDataSelectStyled = styled(CmDataSelect)(() => ({
  width: 400,
  marginBottom: 20,
}));

export { Wrapper, ContentWrapper, TypographyStyled, CmDataSelectStyled };
