import styled from 'styled-components';
import * as CmStyle from '@/stylesheets/common';

export default styled.div`
  display: flex;
  min-width: 160px;
  align-items: center;

  > *:not(:first-child) {
    margin-left: 10px;
    margin-right: 10px;
  }
  .MuiFormControl-root {
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
  }
`;
