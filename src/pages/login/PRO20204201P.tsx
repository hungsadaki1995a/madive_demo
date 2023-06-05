import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Cookies from 'universal-cookie';

import { AuthApi } from '@/apis';
import logGif from '@/stylesheets/images/login/framework_illust.gif';
import { notify } from '@/utils/notify';

import { AUTHENTICATION_COOKIE, USER_INFO_COOKIE } from '@/constants';

import LoginContainer from './Login.Styled';

const DEFAULT_ID_ERROR_MESSAGE = 'ID cannot be blank';
const DEFAULT_PW_ERROR_MESSAGE = 'Password cannot be blank';
const cookies = new Cookies();

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [idError, setIdError] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');

  const handleClick = async () => {
    if (!id) {
      setIdError(DEFAULT_ID_ERROR_MESSAGE);
      return;
    } else {
      setIdError('');
    }

    if (!pw) {
      setPwError(DEFAULT_PW_ERROR_MESSAGE);
      return;
    } else {
      setPwError('');
    }

    try {
      const checkEncryption = await AuthApi.checkUserEncryption(id);

      if (checkEncryption && checkEncryption.dto.value === 'use') {
        setPw((prev) => window.btoa(prev));
      }

      await AuthApi.login({ id, pw });

      cookies.set(
        AUTHENTICATION_COOKIE,
        {
          signed: true,
        },
        {
          maxAge: 604800000, // expired in 1 week
        }
      );

      cookies.set(
        USER_INFO_COOKIE,
        {
          id,
        },
        {
          maxAge: 604800000, // expired in 1 week
        }
      );

      navigate('/', { replace: true });
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  };

  useEffect(() => {
    const auth = cookies.get(AUTHENTICATION_COOKIE);

    if (auth && auth.signed) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <LoginContainer>
      <Grid
        container
        className="loginGrid"
      >
        <Grid
          xs={8}
          className="tImgBox"
        >
          {`Creating a web site or an application,
          people usually have different and sometimes numerous goals.
          Some of them in case of conversion give...`}
        </Grid>

        {/* Login Form */}
        <Grid
          xs={4}
          className=""
          component="form"
        >
          <img
            src={logGif}
            alt=""
          />

          {/* ID */}
          <Box className="id">
            <TextField
              label="ID"
              variant="outlined"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              error={!!idError}
              helperText={idError}
            />
          </Box>
          {/* Password */}
          <Box className="pw">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
              }}
              error={!!pwError}
              helperText={pwError}
            />
          </Box>

          {/* Submit */}
          <Button
            variant="contained"
            disableElevation
            onClick={handleClick}
          >
            Login
          </Button>

          {/* Copyright */}
          <Typography variant="caption">Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.</Typography>
        </Grid>
      </Grid>
    </LoginContainer>
  );
};

export default Login;
