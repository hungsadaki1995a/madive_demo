import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';
// Icon
import BlueStarIcon from '@/stylesheets/images/BlueStarIcon.svg';

// ProminerStyled
const ProminerStyled = styled.div`
  display: flex;
  flex-direction: row;
  font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};

  .pageCon {
    flex-direction: row;
  }

  // Title
  .pageTitle {
    display: flex;
    align-items: center;
    font: 15px/ 1.5 ${CmStyle.notoSansDJKFont.bold};
    color: ${CmStyle.color.colorT01};
    padding-bottom: 20px;
    border-bottom: 1px solid ${CmStyle.color.colorbd01};
    margin-bottom: 30px;
    label {
      margin-right: 14px;
    }
  }

  .MuiPaper-root {
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

    &.detailBox {
      // Test Infomation
      .formInfo {
        width: 400px;
        margin-right: 30px;
        .infoBox {
          margin-top: 5px;
          background: ${CmStyle.color.colorDef};
          box-shadow: none;
          figure {
            width: 100%;
            margin: 0;
            color: ${CmStyle.color.colorBtnString};
            span {
              display: block;
              &::after {
                content: '';
                padding-right: 12px;
                font-size: 10px;
                background: url(${BlueStarIcon}) right top no-repeat;
              }
            }
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
    }

    .tableArea {
      display: flex;
      flex-flow: column wrap;
      width: calc(100% - 430px);

      .MuiTypography-root:not(class*='makeStyles') {
        font-size: 15px;
        padding-bottom: 19px;
      }
      .topBtn {
        flex-direction: row;
        padding-bottom: 11px;
        button {
          width: 78px;
        }
        * ~ * {
          margin-left: 8px;
        }
      }
    }
  }
`;

export { ProminerStyled };
