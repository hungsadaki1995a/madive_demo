import styled from 'styled-components';
import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';
// img, icon
import logBgImg from '@/stylesheets/images/login/login_background.png';
import logTImg from '@/stylesheets/images/login/loginTimg.svg';
import logUser from '@/stylesheets/images/login/logUser.svg';
import logPw from '@/stylesheets/images/login/logPw.svg';

const LoginContainer = styled.div`
  min-height: 100vh;
  min-width: 1600px;
  font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  color: ${CmStyle.color.colorT01};
  background: url(${logBgImg}) 0 0 no-repeat;

  .loginGrid {
    padding: 223px 0 0 585px;

    .tImgBox {
      width: 370px;
      background: url(${logTImg}) no-repeat;
      padding-top: 160px;
      margin: 187px 240px 0 0;
      font: 13px / 1.5 ${CmStyle.notoSansDJKFont.light};
      color: ${CmStyle.color.colorBg02};
    }

    form.MuiGrid2-root {
      width: 320px;

      > img {
        width: 320px;
        margin-bottom: 67px;
      }

      .MuiOutlinedInput-root {
        font: 13px / 1.5 ${CmStyle.notoSansDJKFont.light};
      }

      .MuiBox-root {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &.id {
          background: url(${logUser}) 15px center no-repeat;
          .MuiOutlinedInput-root input.MuiOutlinedInput-input {
            padding: 13.5px 14px 13.5px 42px;
          }
        }
        &.pw {
          background: url(${logPw}) 12px center no-repeat;
          .MuiOutlinedInput-root input.MuiOutlinedInput-input {
            padding: 13.5px 14px 13.5px 45px;
            letter-spacing: 5px;
          }
        }

        .MuiTextField-root {
          width: 100%;

          label.MuiInputLabel-root {
            top: 2px;
            left: 30px;
            font: 16px / 1 ${CmStyle.notoSansDJKFont.light};
            color: ${CmStyle.color.colorT03};
          }
          .MuiOutlinedInput-notchedOutline {
            padding: 0 8px 0 35px;
          }

          .Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${CmStyle.color.colorBtnPrimary};
          }
        }
      }

      // Btn
      button.MuiButtonBase-root {
        width: 100%;
        font: 16px ${CmStyle.notoSansDJKFont.regular};
        line-height: unset;
        text-transform: none;
        background-color: ${CmStyle.color.colorBtnPrimary};
        padding: 13px;
      }

      // Copyright
      .MuiTypography-caption {
        display: block;
        text-align: center;
        margin-top: 67px;
        font: 13px / 1 ${CmStyle.notoSansDJKFont.regular};
      }
    }
  }
`;
export default LoginContainer;
