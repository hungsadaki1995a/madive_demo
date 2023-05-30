import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

// Button
const ButtonStyled = styled.div`
  .subTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    h6 {
      font-size: 15px;
      font-family: ${CmStyle.notoSansDJKFont.bold};
      color: ${CmStyle.color.colorT01};

      span.naviSubConut {
        color: ${CmStyle.color.colorBtnPrimary};
      }
      span.naviSubText {
        padding-left: 20px;
        font-size: 13px;
        font-family: ${CmStyle.notoSansDJKFont.light};
      }
    }
  }

  .demo {
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

    p {
      font-size: 18px;
    }

    .MuiStack-root {
      background: ${CmStyle.color.colorBg02};
      padding: 10px;
      border-bottom: 1px dotted ${CmStyle.color.colorT02};

      &:last-child {
        border-bottom: 0;
      }

      label:not([class]) {
        min-width: 180px;
        margin: auto 0;
      }
    }
  }
`;

// Card
const CardStyled = styled.div`
  .MuiPaper-root {
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

// Modal
const ModalStyled = styled.div``;

// SnackbarStyled
const SnackbarStyled = styled.div`
  .MuiSnackbar-root {
    .MuiPaper-root.MuiAlert-root {
      width: 400px;
      height: 52px;
      align-items: center;
      padding: 0 16px;

      // Icon
      .MuiAlert-icon {
        width: 22px;
        justify-content: center;
        margin-right: 8px;
      }

      // Message
      .MuiAlert-message {
        width: calc(100% - 28px);
        display: flex;
        align-items: center;
        font: 13px / 1 ${CmStyle.notoSansDJKFont.regular};
        color: ${CmStyle.color.colorT04};

        .alignR.MuiBox-root {
          display: flex;
          align-items: center;
          button {
            font: 13px / 1 ${CmStyle.notoSansDJKFont.regular};
            color: ${CmStyle.color.colorT01};
            text-decoration: underline;
            :hover {
              background: none;
            }
          }
        }
      }

      // Success
      &.MuiAlert-filledSuccess {
        background: ${CmStyle.color.colorSuccessBg};
      }
      // Info
      &.MuiAlert-filledInfo {
        background: ${CmStyle.color.colorInfoBg};
      }
      // Warning
      &.MuiAlert-filledSuccess {
        background: ${CmStyle.color.colorWarningBg};
      }
      // Error
      &.MuiAlert-filledError {
        background: ${CmStyle.color.colorErrorBg};

        .MuiAlert-message {
          color: ${CmStyle.color.colorBg02};

          // Right Text
          .alignR.MuiBox-root button {
            color: ${CmStyle.color.colorBg02};
          }
        }
      }
    }
  }
`;

// Table
const TableStyled = styled.div`
  .MuiPaper-root {
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;
export { ButtonStyled, CardStyled, ModalStyled, SnackbarStyled, TableStyled };
