import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';

// img
import logGif from '@/stylesheets/images/login/framework_illust.gif';
import LoginContainer from './Login.Styled';

function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/cm/button', { replace: true });
  };

  return (
    <LoginContainer>
      <CssBaseline />

      <Grid container className="loginGrid">
        <Grid xs={8} className="tImgBox">
          {`Creating a web site or an application,
          people usually have different and sometimes numerous goals.
          Some of them in case of conversion give...`}
        </Grid>

        {/* Login Form */}
        <Grid xs={4} className="" component="form">
          <img src={logGif} />

          {/* ID */}
          <Box className="id">
            <TextField label="ID" variant="outlined" />
          </Box>
          {/* Password */}
          <Box className="pw">
            <TextField label="Password" variant="outlined" type="password" />
          </Box>

          {/* Submit */}
          <Button variant="contained" disableElevation onClick={handleClick}>
            Login
          </Button>

          {/* Copyright */}
          <Typography variant="caption">Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.</Typography>
        </Grid>
      </Grid>
    </LoginContainer>
  );
}
export default Login;
