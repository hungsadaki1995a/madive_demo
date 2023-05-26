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

      .labelFormArea {
        width: 100%;
        padding-bottom: 20px;
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

          // .MuiSelect-select {
          //   font: 13px/ 2 ${CmStyle.notoSansDJKFont.regular};
          //   color: ${CmStyle.color.colorT01};
          //   padding-top: 1px;
          //   padding-bottom: 1px;

          //   em {
          //     font-style: normal;
          //   }
        }
      }

      & + .formArea {
        margin-top: 20px;
      }
    }

    & ~ .MuiPaper-root {
      width: calc(100% - 456px);
    }
  }
`;

export { TestStyled };
