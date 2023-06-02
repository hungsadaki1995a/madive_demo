import { DialogTitle, InputLabel } from '@mui/material';
import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';
import FailIcon from '@/stylesheets/images/FailIcon.svg';
import SuccessIcon from '@/stylesheets/images/SuccessIcon.svg';

// Common Button
const CmButtonStyle = styled.label`
  /* button {
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
  } */
`;

// Common Card
const CmCardStyle = styled.div`
  font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  display: inline-block;
  padding: 0 20px 20px 0;
  .MuiCard-root {
    width: 305px;
    min-height: 270px;
    /* display: inline-block; */
    padding: 14px;

    // cardTitle
    .MuiCardHeader-root {
      padding: 0 5px 14px 5px;
      border-bottom: 1px solid ${CmStyle.color.colorBtnSecondaryBg03};

      span.MuiCardHeader-title {
        font: 15px / 20px ${CmStyle.notoSansDJKFont.medium};
      }

      .MuiCardHeader-action {
        padding-right: 5px;
        margin: 0;
        opacity: 0;
        transition: opacity 250ms;

        label ~ label {
          margin-left: 5px;
        }
      }
    }

    // Hover - Btn
    :hover {
      .MuiCardHeader-action {
        opacity: 1;
        path {
          fill: ${CmStyle.color.colorT03};
        }

        .MuiIconButton-root:hover path {
          fill: ${CmStyle.color.colorT00};
        }
      }
    }

    // cardContent
    .MuiCardContent-root {
      margin: 20px 35px 5px 35px;
      padding: 0;

      .conTitle {
        display: flex;
        align-items: center;
        font: 15px / 1.5 ${CmStyle.notoSansDJKFont.medium};
        margin-bottom: 18px;

        svg {
          margin-right: 10px;
          margin-left: -35px;
        }
      }

      .conList {
        padding: 0;
        * {
          padding: 0;
          font: 13px / 24px ${CmStyle.notoSansDJKFont.regular};
        }
        .MuiListItemSecondaryAction-root {
          width: 20%;

          a.MuiLink-root {
            color: ${CmStyle.color.colorBtnPrimary};
          }
        }
      }
    }

    // addCard
    &.addCard {
      .MuiButtonBase-root {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 65px 0;
        margin: auto 0;
        font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};
        color: ${CmStyle.color.colorT00};

        svg {
          font-size: 49px;
          margin-bottom: 35px;
        }
        &:hover {
          background: none;
        }
      }
    }
  }
`;

// Common Select
const CmSelectStyle = styled.label`
  /* .MuiFormControl-root {
    margin: -5px 0 0 0;
    min-width: 160px;
    * {
      font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
    }

    .MuiSelect-select {
      padding: 10px 32px 5px 8px;
      // min-height: 28px;
    }
    .MuiSvgIcon-root {
      top: calc(50% - 9px);
      font-size: 1.3rem;
    }
  }

  min-width: 160px;

  *:hover,
  *:focus {
    border-color: ${CmStyle.color.colorBtnPrimary};
  }
  .MuiOutlinedInput-root {
    width: 100%;
    font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};

    &:hover,
    &:focus {
      border-color: ${CmStyle.color.colorBtnPrimary} !important;
    }

    .MuiSelect-select {
      // padding: 4px 8px;
      // min-height: 28px;
    }

    fieldset.MuiOutlinedInput-notchedOutline {
      :hover,
      :focus {
        border-color: ${CmStyle.color.colorBtnPrimary};
      }
    }
  } */
`;

// Common Modal
const CmModalStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  border: 2px solid #000;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  padding: 20px;
  background: #fff;

  &.small {
    width: 400px;
  }
  &.medium {
    width: 560px;
  }
  &.large {
    width: 960px;
  }
  button {
    text-transform: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .MuiTypography-root {
      font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};
    }
  }
  .contents {
    p.pointTxt {
      font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
      color: ${CmStyle.color.colorT01};
      padding-bottom: 30px;
      margin: 0;
    }
    .detailEditor {
      width: 100%;
      font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
      color: ${CmStyle.color.colorBtnString};
      .MuiGrid-root {
        padding: 15px;
        font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
        color: ${CmStyle.color.colorBtnString};
      }
      .MuiPaper-root {
        color: ${CmStyle.color.colorT01};
        background: #f5f6f7;
        border: 1px solid #d3d5da;
        margin-top: 8px;
        border-radius: 5px;
        box-shadow: none;
        /* padding: 5px; */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 4px 8px;
        gap: 4px;
      }
      .MuiTextField-root {
        width: 100%;
        border: 1px solid #d3d5da;
        background: #f5f6f7;
        padding: 8px;
        margin-top: 8px;
        border-radius: 5px;
        .MuiInputBase-root {
          border: 0;
          padding: 0;
          line-height: 200%;
          color: ${CmStyle.color.colorT01};
        }
        .Mui-disabled {
          color: ${CmStyle.color.colorT01};
          -webkit-text-fill-color: unset;
        }
        .MuiOutlinedInput-notchedOutline {
          border: 0;
        }
      }
    }
    // Radio
    .MuiRadio-root {
      padding: 5px;
    }
    // Fail, Error
    .error {
      color: #d93e2e;
      vertical-align: middle;
      padding-left: 20px;
      background: url(${FailIcon}) left center no-repeat;
    }
    // Success
    .success {
      color: #30be8b;
      vertical-align: middle;
      padding-left: 20px;
      background: url(${SuccessIcon}) left center no-repeat;
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
          *:not([button *]) {
            color: ${CmStyle.color.colorT01};
          }
          td {
            border: 1px solid ${CmStyle.color.colorBtnSecondaryBg03};
          }
        }
      }
      // TextField
      .MuiOutlinedInput-input {
        height: 23px;
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

    .labelFormArea,
    .inputArea {
      width: 100%;
      padding-bottom: 20px;
      display: flex;

      .MuiTextField-root {
        margin-top: -1px;

        // TextField
        .MuiOutlinedInput-input {
          height: 27px;
          padding: 1px 8px 2px;
          font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.light};
          &.Mui-disabled {
            background: rgba(0, 0, 0, 0.05);
            color: ${CmStyle.color.colorT01};
          }
          .Mui-disabled .MuiOutlinedInput-notchedOutline {
            color: ${CmStyle.color.colorBtnDisabledText};
            background-color: rgba(0, 0, 0, 0.03);
          }
        }
      }
    }

    .labelFormArea {
      // Title
      > span {
        // width: 190px;
        font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.light};
        color: ${CmStyle.color.colorBtnString};
        padding-top: 4px;
      }
      // form Column
      .formColumn {
        margin-left: auto;
        width: 65%;
        .MuiTextField-root {
          margin-left: 0;
          width: 100%;
          .MuiOutlinedInput-root {
            padding: 0 !important;
          }
        }
      }
      // form Row
      .formRow {
        margin-left: auto;
        width: 65%;
        display: flex;
        flex-direction: row;
        .MuiTextField-root {
          margin-left: 0%;
          width: auto;
          & ~ * {
            margin-left: 8px;
          }
        }
      }
      // TextField
      .MuiTextField-root {
        margin-left: auto;
        width: 65%;

        fieldset span.notranslate {
          color: ${CmStyle.color.colorT01};
        }

        // Multiline
        .MuiInputBase-multiline {
          padding: 4px 8px;
          textarea {
            padding: 5px 0 1px;
          }
        }
      }
      .MuiFormControl-root {
        margin-left: auto;
        width: 65%;
        & ~ * {
          margin: 0;
        }
        .Mui-disabled {
          /* color: ${CmStyle.color.colorT01}; */
          -webkit-text-fill-color: unset;
        }
        // Select
        .MuiSelect-outlined {
          width: 100%;
        }
        .MuiSelect-select {
          padding: 5px 14px;
          font-size: 13px;
          em {
            font-style: normal;
          }
        }
      }

      & + .formArea {
        margin-top: 20px;
      }
    }

    // Form Between
    .formBtw {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    // file Upload
    .fileUpBtn {
      color: ${CmStyle.color.colorBtnString};
      background: none;
      box-shadow: none;
      padding: 0;
      input[type='file']::file-selector-button {
        min-height: 28px;
        width: 90px;
        border: 0;
        border-radius: 5px;
        font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
        min-height: 28px;
        align-items: center;
        color: ${CmStyle.color.colorBg02};
        background: ${CmStyle.color.colorBtnPrimary};

        cursor: pointer;
        &:hover {
          background: ${CmStyle.color.colorBtnPrimaryHover};
        }
        &:active {
          background: ${CmStyle.color.colorBtnPrimaryActive};
        }
      }
    }

    .inputArea {
      align-items: center;

      // TextField
      .MuiTextField-root {
        margin-right: 5px;
        width: 100%;
      }
    }

    // width
    .half {
      width: 50%;
      display: inline-flex;
    }
  }

  .inputDataBox {
    p.MuiTypography-root {
      margin-bottom: 20px;
    }
    div[role='tabpanel'] {
      padding: 20px 10px;
      & > .MuiBox-root {
        padding: 0;
      }
      .treeBox {
        width: 200px;
        margin-right: 30px;
        li.MuiTreeItem-root {
          padding-bottom: 7px;
        }
      }
      .tableBox {
        width: calc(100% - 230px);
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

  .footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
    label.check {
      display: flex;
      align-items: center;
      .MuiCheckbox-root {
        padding: 0;
      }
      span:not(style) {
        margin-left: 5px;
        font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
      }
      .MuiCheckbox-colorSecondary.Mui-checked {
        color: ${CmStyle.color.colorBtnPrimary};
      }
    }

    button + * {
      margin-left: 8px;
    }

    // align
    .alignL {
      margin-left: auto;
    }
  }
`;

// Common Table
const CmTableStyle = styled.div`
  .MuiTableHead-root {
    border-bottom: 2px solid ${CmStyle.color.colorbd01};
  }

  .MuiTableCell-head {
    font: 13px / 1 ${CmStyle.notoSansDJKFont.medium};
    color: ${CmStyle.color.colorBtnString};
    border: 0;
    padding: 8px;
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      border-bottom: 1px solid ${CmStyle.color.colorbd01};
      :hover {
        background: ${CmStyle.color.colorDef};
      }
      &.Mui-selected {
        background: ${CmStyle.color.colorBtnSecondaryBg03};
      }

      .MuiTableCell-body {
        font: 13px / 1 ${CmStyle.notoSansDJKFont.regular};
        color: ${CmStyle.color.colorT01};
        border: 0;
        padding: 6px 8px;
      }
      a.MuiLink-root {
        color: ${CmStyle.color.colorT01};
        text-decoration-color: ${CmStyle.color.colorT01};
      }
    }
  }

  // Form
  .formCell {
    width: 30px;
    // CheckBox
    .MuiCheckbox-root {
      padding: 0;
    }
  }
`;

const DialogTitleStyled = styled(DialogTitle)(() => ({
  paddingBottom: 0,
}));

//field label
const CmFieldLabel = styled(InputLabel)(({ width }: { width?: string }) => ({
  width: width || '35%',
  display: 'flex',
  alignItems: 'center',
}));

export { CmButtonStyle, CmCardStyle, CmSelectStyle, CmModalStyle, CmTableStyle, DialogTitleStyled, CmFieldLabel };
