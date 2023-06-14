import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

// UserStyled
const UserStyled = styled.div`
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

    &.transferBox {
      .transferGrid {
        justify-content: center;
        /* align-items: center; */ //this line make every item it contain to be center
        .MuiPaper-root {
          box-shadow: none;
        }
        p.MuiTypography-root {
          margin-bottom: 20px;
        }
        .MuiGrid-root {
          width: 45%;
        }
        .btnCenter {
          min-width: 70px;
          width: 10%;
          display: flex;
          justify-content: center;
          .MuiGrid-root {
            width: 100%;

            button {
              margin: 3px 0;
              width: 120px;
            }
          }
        }
      }
      .formBox {
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
          .MuiFormControl-root {
            width: 100%;
          }
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

      &.inputDataBox {
        p.MuiTypography-root {
          margin-bottom: 20px;
        }
        div[role='tabpanel'] {
          padding: 20px 10px;
          & > .MuiBox-root {
            padding: 0;
          }
          .treeBox {
            width: 300px;
          }
          .tableBox {
            width: calc(100% - 300px);
          }
          /* Table */
          table {
            * {
              font: 13px / 1 ${CmStyle.notoSansDJKFont.regular};
            }
            th,
            td {
              padding: 8px;
              height: 44px;
            }
            &.addRow {
              thead th {
                background: ${CmStyle.color.colorBtnSecondaryBg01};
                border: 1px solid ${CmStyle.color.colorBtnSecondaryBg03};
                color: ${CmStyle.color.colorT05};
                &.iconBtn {
                  width: 35px;
                }
              }
              tbody {
                td {
                  color: ${CmStyle.color.colorT01};
                  border: 1px solid ${CmStyle.color.colorBtnSecondaryBg03};
                }
              }
            }
            // TextField
            .MuiOutlinedInput-input {
              height: 27px;
              padding: 1px 8px 2px;
              font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.light};
              &.Mui-disabled {
                -webkit-text-fill-color: unset;
                color: ${CmStyle.color.colorT01};
              }
              .Mui-disabled .MuiOutlinedInput-notchedOutline {
                color: ${CmStyle.color.colorBtnDisabledText};
                background-color: rgba(0, 0, 0, 0.03);
              }
            }
          }
        }
      }
    }
  }
`;

export { UserStyled };
