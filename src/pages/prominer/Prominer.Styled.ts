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

      .MuiTypography-root {
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

      /* '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}); */
    }

    /* & ~ .MuiPaper-root {
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
    } */
  }
`;

export { ProminerStyled };
