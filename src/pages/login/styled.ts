import { Grid, styled } from '@mui/material';

import logBgImg from '@/stylesheets/images/login/login_background.png';
import logTImg from '@/stylesheets/images/login/loginTimg.svg';

const LoginWrapper = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  minWidth: '1600px',
  font: '16px / 1.5 NotoSansCJK',
  color: theme.palette.info.main[900],
  background: `url(${logBgImg}) 0 0 no-repeat`,
}));

const LoginGrid = styled(Grid)(() => ({
  padding: '223px 0 0 585px',
}));

const ImgBox = styled(Grid)(({ theme }) => ({
  width: '370px',
  background: `url(${logTImg}) no-repeat`,
  paddingTop: '160px',
  margin: '187px 240px 0 0',
  font: '13px / 1.5 NotoSansCJK',
  fontWeight: 300,
  color: theme.palette.common.white,
}));

const Form = styled('form')(() => ({
  width: '320px',
  font: '13px / 1.5 NotoSansCJK',
  fontWeight: 300,
}));

const Img = styled('img')(() => ({
  width: '320px',
  marginBottom: '67px',
}));

const LoginBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
}));

export { LoginWrapper, LoginGrid, ImgBox, Form, Img, LoginBox };
