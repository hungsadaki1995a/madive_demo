import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';

export default styled.div`
  padding: 12;
  flex-grow: 10;
  overflow-y: auto;
  & table {
    table-layout: fixed;
    th,
    td {
      /* width: unset; */
      white-space: nowrap;
      padding: 6px 8px;
      & span {
        padding: 0;
        &.MuiCheckbox-root {
          display: flex;
        }
      }
    }
  }
  & div {
    box-shadow: none;
  }
  & thead {
    border-bottom: 2px solid #d3d5da;
    tr {
      width: 30px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    th {
      font: 13px / 1.5 ${CmStyle.notoSansDJKFont.medium};
      color: #7a828e;
    }
  }
  & tbody {
    padding: 0 16px;
    background-color: #fff;
    & tr:hover {
      background-color: #e6f4ff;
    }
    & td {
      font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
      color: #1c293e;

      button {
        font: 13px / 1.5 ${CmStyle.notoSansDJKFont.light};
        padding: 2.5px 8px;
        line-height: 20px;
        align-items: center;
        min-width: 20px;
        min-height: 28px;
        text-transform: none;
        box-shadow: none !important;

        .MuiButton-startIcon {
          margin: 0;
          padding: 2.5px 0 2px 0;
          svg {
            font-size: 18px;
            // height: 18.5px;
            path {
              width: 15px;
              height: 15px;
            }
          }
        }
        span:not([class*='Mui']) {
          padding: 0 4px;
          font: 13px / 1.5 ${CmStyle.notoSansDJKFont.light};
        }

        // Primary - Filled
        &.MuiButton-containedPrimary:not([class*='-disabled']) {
          color: ${CmStyle.color.colorBg02};
          background: ${CmStyle.color.colorBtnPrimary};

          &:hover {
            background: ${CmStyle.color.colorBtnPrimaryHover};
          }
          &:active {
            background: ${CmStyle.color.colorBtnPrimaryActive};
          }
        }
        &.MuiButton-containedPrimary.Mui-disabled {
          color: ${CmStyle.color.colorBtnDisabledText};
          background: ${CmStyle.color.colorBtnDisabled};
          &:hover {
            background: ${CmStyle.color.colorBtnDisabled};
          }
        }

        // Text - Ghost (No Background)
        &.MuiButton-textPrimary:not([class*='-disabled']) {
          color: ${CmStyle.color.colorT01};
          // &.underLink {
          //     text-decoration: underline;
          //     padding: 0;
          // }
          &:hover {
            background: ${CmStyle.color.colorBtnSecondaryBg01};
          }
        }
        &.MuiButton-textPrimary.Mui-disabled {
          color: ${CmStyle.color.colorBtnDisabledText};
          &:hover {
            background: none;
          }
        }

        // String - Ghost (Background)
        &.tBtnBg:not([class*='-disabled']) {
          color: ${CmStyle.color.colorT01};
          background: ${CmStyle.color.colorBtnSecondaryBg01};

          &:hover {
            background: ${CmStyle.color.colorBtnSecondaryBg02};
          }
          &:active {
            background: ${CmStyle.color.colorBtnSecondaryBg03};
          }
        }
        &.tBtnBg.Mui-disabled {
          color: ${CmStyle.color.colorBtnDisabledText};
          background: ${CmStyle.color.colorBtnDisabled};
        }

        // Outline - Login button
        &.MuiButton-outlinedPrimary:not([class*='-disabled']) {
          color: ${CmStyle.color.colorBg02};
          background: ${CmStyle.color.colorBtnTextBg01};
          padding: 5px 8px;
          border: 0;
          .MuiButton-startIcon svg {
            width: 15px;
            height: 15px;
          }
          &:hover {
            background: ${CmStyle.color.colorBtnTextBg02};
          }
          &:active {
            background: ${CmStyle.color.colorBtnTextBg03};
          }
        }
        &.MuiButton-outlinedPrimary.Mui-disabled {
          color: ${CmStyle.color.colorT03};
          background: ${CmStyle.color.colorBtnTextBg04};
          padding: 5px 8px;
          border: 0;
          .MuiButton-startIcon svg {
            width: 15px;
            height: 15px;
          }
          &:hover {
            background: none;
          }
        }
      }

      // IconButton
      .MuiIconButton-root {
        min-width: unset;
        padding: 2px;
        margin-left: 3px;
        &:hover,
        &:active {
          background: none;
          svg path {
            transition: fill 250ms;
            fill: ${CmStyle.color.colorT00};
          }
        }
      }
    }
  }
`;
