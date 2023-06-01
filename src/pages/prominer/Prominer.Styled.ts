import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

// ProminerStyled
const ProminerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};

  // Title
  .MuiTypography-root {
    font: 15px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
    color: ${CmStyle.color.colorT01};
    display: block;
    margin-bottom: 20px;
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
      & ~ * {
        width: calc(100% - 430px);
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
            margin-right: 30px;
            li.MuiTreeItem-root {
              padding-bottom: 7px;
            }
          }
          .tableBox {
            width: calc(100% - 330px);
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

export { ProminerStyled };
