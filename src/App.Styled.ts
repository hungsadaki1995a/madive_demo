import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

const CmContainer = styled.div`
  color: ${CmStyle.color.colorT01};
  background: ${CmStyle.color.colorDef};
  font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};

  .gridContainer {
    min-width: 1600px;
    min-height: calc(var(--vh, 1vh) * 100);

    // Left Nav Bar
    .lnbArea {
      width: 240px;
      background: ${CmStyle.color.colorBg02};

      .logo {
        height: 54px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 0;
        background: ${CmStyle.color.colorBg01};

        img {
          width: 164px;
        }
      }
    }

    // Contents
    .conArea {
      width: calc(100% - 240px);

      main {
        padding: 30px 25px;
        max-width: 1740px;
      }
    }
  }

  .lnbMenuBox {
    padding: 7px;
  }

  // Button
  button {
    text-transform: none;
  }
`;
export default CmContainer;
