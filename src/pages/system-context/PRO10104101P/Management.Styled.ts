import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

const ManagementStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
  margin-top: 20px;
  .MuiTypography-root {
    font: 15px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
    color: ${CmStyle.color.colorT01};
    margin-bottom: 25px;
  }

  .MuiPaper-root {
    width: 100%;
    padding: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

    &.selectBox {
      width: 440px;
      margin-right: 16px;

      .labelFormArea {
        width: 100%;
        display: flex;
        align-items: center;

        > span {
          font: 13px/ 1.5 ${CmStyle.notoSansDJKFont.regular};
          color: ${CmStyle.color.colorBtnString};
          padding-top: 4px;
        }

        .MuiInputBase-root {
          margin-left: auto;
          width: 230px;
          padding: 0;
        }
      }

      & + .formArea {
        margin-top: 20px;
      }
    }

    & ~ .MuiPaper-root {
      width: calc(100% - 456px);
    }

    .labelFormArea.secondFormArea {
      padding-top: 20px;
    }
  }
`;
export { ManagementStyled };
