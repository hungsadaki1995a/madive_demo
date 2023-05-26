import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

// TestStyled
const TestStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};

  // Title
  .MuiTypography-root {
    font: 15px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
    color: ${CmStyle.color.colorT01};
    margin-bottom: 25px;
  }

  .MuiPaper-root {
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

    &.selectBox {
      width: 440px;
      margin-right: 16px;

      .formBox {
        p.MuiTypography-root {
          margin-bottom: 20px;
        }
        & ~ *:not(.flexEnd) {
          margin-top: 35px;
        }
        .labelFormArea {
          width: 100%;
          display: flex;
          align-items: center;
          // label
          > span {
            font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
            color: ${CmStyle.color.colorBtnString};
            padding-top: 4px;
          }
          // Form
          .MuiInputBase-root {
            margin-left: auto;
            width: 230px;
            padding: 0;
          }
          & + .formArea {
            margin-top: 20px;
          }
          & ~ .labelFormArea {
            margin-top: 20px;
          }
        }
      }
      // Test Infomation
      .formInfo {
        .infoBox {
          background: ${CmStyle.color.colorDef};
          box-shadow: none;
          figure {
            width: 100%;
            margin: 0;
            color: ${CmStyle.color.colorBtnString};
            figcaption {
              color: ${CmStyle.color.colorT01};
              padding: 12px 5px;
              margin: 0;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              word-break: break-all;
            }
            & ~ * {
              margin-top: 10px;
            }
          }
        }
      }
      & ~ .MuiPaper-root {
        width: calc(100% - 456px);
      }
    }

    & ~ .MuiPaper-root {
      width: calc(100% - 456px);
    }
  }
`;

export { TestStyled };
