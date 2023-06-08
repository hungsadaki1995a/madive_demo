import { Button, styled, TextField, Typography } from '@mui/material';

import logBgImg from '@/stylesheets/images/login/login_background.png';

const LoginWrapper = styled('div')(({ theme }) => ({
  minHeight: '900px',
  minWidth: '1600px',
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.info.main[900],
  background: `url(${logBgImg}) 0 0 no-repeat`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TmaxWrapper = styled('div')(() => ({
  width: '65%',
  paddingLeft: 600,
}));

const TmaxBox = styled('div')(() => ({
  minHeight: '100vh',
  width: '370px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

const TypoStyled = styled(Typography)<{ color: 'white' | 'black' }>(({ theme, color }) => ({
  fontSize: '13px',
  fontWeight: 300,
  color: color ?? theme.palette.common[color],
}));

const LoginBoxWrapper = styled('div')(() => ({
  width: '35%',
  paddingLeft: 120,
}));

const LoginBox = styled('div')(() => ({
  width: '320px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ImageStyled = styled('img')(({ marginBottom }: { marginBottom?: number }) => ({
  marginBottom: marginBottom ? marginBottom : 0,
}));

const TextFieldStyled = styled(TextField)(() => ({
  width: '100%',
  marginBottom: 20,
}));

const ButtonStyled = styled(Button)(() => ({
  width: '100%',
  marginBottom: 70,
}));

export {
  LoginWrapper,
  TmaxWrapper,
  LoginBoxWrapper,
  ButtonStyled,
  TypoStyled,
  ImageStyled,
  TmaxBox,
  LoginBox,
  TextFieldStyled,
};
