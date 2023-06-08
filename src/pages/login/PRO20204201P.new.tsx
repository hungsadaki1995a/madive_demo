import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { IsNotEmpty } from 'class-validator';
import Cookies from 'universal-cookie';

import { AuthApi } from '@/apis';
import logGif from '@/stylesheets/images/login/framework_illust.gif';
import logTImg from '@/stylesheets/images/login/loginTimg.svg';
import { ReactComponent as PasswordIcon } from '@/stylesheets/images/login/logPw.svg';
import { ReactComponent as UserIcon } from '@/stylesheets/images/login/logUser.svg';
import { notify } from '@/utils/notify';

import { AUTHENTICATION_COOKIE, COOKIE_EXPIRE_TIME, USER_INFO_COOKIE } from '@/constants';

import {
  ButtonStyled,
  ImageStyled,
  LoginBox,
  LoginBoxWrapper,
  LoginWrapper,
  TextFieldStyled,
  TmaxBox,
  TmaxWrapper,
  TypoStyled,
} from './styled';

const cookies = new Cookies();

class LoginDto {
  @IsNotEmpty({ message: 'User name cannot blank' })
  username: string;

  @IsNotEmpty({ message: 'Password cannot blank' })
  password: string;
}

const resolver = classValidatorResolver(LoginDto);

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: {
      username: '',
      password: '',
    },
    resolver,
  });

  const handleClickShowPassword = () => setIsShowPassword((show) => !show);

  const handleSubmitForm = handleSubmit(async ({ username, password }) => {
    try {
      let newPassword = password;
      const checkEncryption = await AuthApi.checkUserEncryption(username);

      if (checkEncryption && checkEncryption.dto.value === 'use') {
        newPassword = window.btoa(password);
      }

      await AuthApi.login({ id: username, pw: newPassword });
      cookies.set(
        AUTHENTICATION_COOKIE,
        {
          signed: true,
        },
        {
          maxAge: COOKIE_EXPIRE_TIME, // expired in 1 week
        }
      );
      cookies.set(
        USER_INFO_COOKIE,
        {
          id: username,
        },
        {
          maxAge: COOKIE_EXPIRE_TIME, // expired in 1 week
        }
      );

      navigate('/', { replace: true });
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    }
  });

  useEffect(() => {
    const auth = cookies.get(AUTHENTICATION_COOKIE);

    if (auth && auth.signed) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <LoginWrapper>
      <TmaxWrapper>
        <TmaxBox>
          <ImageStyled
            marginBottom={50}
            src={logTImg}
            alt="Tmax logo"
          />
          <TypoStyled color={'white'}>
            Creating a web site or an application, people usually have different and sometimes numerous goals. Some of
            them in case of conversion give...
          </TypoStyled>
        </TmaxBox>
      </TmaxWrapper>
      <LoginBoxWrapper>
        <LoginBox>
          <ImageStyled
            src={logGif}
            alt=""
            marginBottom={75}
          />
          <Controller
            name={'username'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                label="ID"
                variant="outlined"
                value={value}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={onChange}
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
            )}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                label="Password"
                variant="outlined"
                value={value}
                type={isShowPassword ? 'text' : 'password'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {isShowPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={onChange}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            )}
          />
          <ButtonStyled
            variant="contained"
            onClick={handleSubmitForm}
          >
            Login
          </ButtonStyled>
          <TypoStyled
            variant="caption"
            color={'black'}
          >
            Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.
          </TypoStyled>
        </LoginBox>
      </LoginBoxWrapper>
    </LoginWrapper>
  );
};

export default Login;
