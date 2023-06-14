import styled from 'styled-components';

import * as CmStyle from '@/stylesheets/common';
import '@/stylesheets/font/stylesheet.css';

const CmGnbStyle = styled.div`
  * {
    font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  }
  .header {
    background: ${CmStyle.color.colorBg01};
    box-shadow: none;

    .MuiToolbar-root {
      max-width: 1740px;
      padding-right: 30px;
    }

    .css-r6ewbb-MuiToolbar-root {
      height: 54px;
      min-height: unset;
      align-items: center;

      .css-0 {
        display: flex;
        flex-grow: 1;
        height: 100%;

        button {
          margin-top: 0;
          margin-bottom: 0;
          color: ${CmStyle.color.colorBg02};
          height: 100%;
          padding: 0 30px;
          border-radius: 0;
          display: block;

          :hover {
            background: ${CmStyle.color.colorBtnPrimary};
          }
        }
      }
      // rightBtn
      .css-2uchni {
        flex-grow: 0;
        height: unset;
      }
    }
  }
`;

const CmLnbStyle = styled.div`
  * {
    font: 16px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  }
  min-height: 100vh;
  width: 240px;
  background: ${CmStyle.color.colorBg02};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

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

  .lnbMenuBox {
    > .MuiTreeItem-root {
      padding: 7.5px 0;

      > .MuiTreeItem-content {
        padding: 9px 15px;
        border-radius: 5px;
        flex-direction: row-reverse;

        &.Mui-expanded {
          // focus
          background: ${CmStyle.color.colorBg05};
        }

        // Arrow Icon
        .MuiTreeItem-iconContainer svg {
          font: 14px / 1.5 ${CmStyle.notoSansDJKFont.light};
          color: ${CmStyle.color.colorT00};
        }

        // 1DepthMenu
        .MuiTreeItem-label {
          padding-left: 0;
          .MuiBox-root {
            display: flex;
            align-items: center;
            svg {
              width: 20px;
              font-size: 15px;
              margin-right: 15px;
            }

            p.MuiTypography-root {
              font: 15px / 1 ${CmStyle.notoSansDJKFont.bold};
              margin-left: 13px;
            }
          }
        }
        &:hover,
        &.Mui-selected {
          background: ${CmStyle.color.colorBg04};
        }

        // 2 Depth
        & ~ .MuiTreeItem-group {
          margin-top: 8px;
          .MuiTreeItem-root .MuiTreeItem-content {
            padding: 12px 25px 12px 0;
            border-radius: 5px;

            .MuiTreeItem-iconContainer {
              width: 0;
            }
            .MuiTreeItem-label .MuiBox-root {
              padding-left: 5px;
              font: 13px / 1 ${CmStyle.notoSansDJKFont.light};

              svg {
                font-size: 13px;
                margin-right: 10px;
                opacity: 0;
              }
              &:hover {
              }
            }
            &.Mui-selected {
              color: ${CmStyle.color.colorBtnPrimary};
              background: none;
              .MuiTreeItem-label .MuiBox-root svg {
                opacity: 1;
                transition: opacity 250ms;
              }
            }
          }
        }
      }
    }
  }
`;

// Common Breadcrumbs
const CmBreadcrumbsStyle = styled.div`
  * {
    font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  }

  // Breadcrumbs
  .MuiBox-root[title='breadcrumbs'] {
    padding: 30px 20px;
    background: ${CmStyle.color.colorBg04};

    nav[aria-label='breadcrumbs'] {
      li {
        a {
          font-size: 12px;
          color: ${CmStyle.color.colorT01};
          text-decoration: none;
          cursor: pointer;
          :hover {
            text-decoration: underline;
          }
        }
        :last-child a {
          color: ${CmStyle.color.colorBtnPrimaryHover};
        }

        &.MuiBreadcrumbs-separator {
          color: ${CmStyle.color.colorT03};
        }
      }
    }

    // Title
    h6.MuiTypography-subtitle1 {
      font-size: 15px;
      font-family: ${CmStyle.notoSansDJKFont.bold};
      color: ${CmStyle.color.colorT01};
    }
  }
`;
// Common CmSearch
const CmSearchStyle = styled.div`
  /* * {
    font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  }
  margin-bottom: 20px;

  // Search
  .MuiPaper-root[title='search'] {
    padding: 2px 0;
    display: flex;
    align-items: center;

    svg[data-testid='SearchOutlinedIcon'] {
      margin: 0 15px;
      font-size: 18px;
    }

    .MuiStack-root {
      padding: 0;
      border: 0;

      .MuiChip-root {
        height: 24px;
        .MuiChip-label {
          line-height: 1;
        }
      }
    }
    .MuiInputBase-root {
      width: 100%;
      font-family: ${CmStyle.notoSansDJKFont.regular};
    }
    .MuiStack-root ~ .MuiInputBase-root {
      padding-left: 15px;
    }
  } */
`;

// Common CmPageTitle
const CmPageTitleStyle = styled.div`
  /* * {
    font: 13px / 1.5 ${CmStyle.notoSansDJKFont.regular};
  }

  .subTitle {
    min-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px 0;

    h6 {
      font: 15px / 1.5 ${CmStyle.notoSansDJKFont.bold};
      color: ${CmStyle.color.colorT01};

      span.naviSubConut {
        font: 15px / 1.5 ${CmStyle.notoSansDJKFont.bold};
        color: ${CmStyle.color.colorBtnPrimary};
      }
      span.naviSubText {
        padding-left: 20px;
        font-size: 13px;
        font-family: ${CmStyle.notoSansDJKFont.light};
      }
    }
  }

  .MuiPaper-root ~ .subTitle {
    padding-top: 12px;
  } */
`;

const CmContainerStyled = styled.div`
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

export { CmBreadcrumbsStyle, CmContainerStyled, CmGnbStyle, CmLnbStyle, CmPageTitleStyle, CmSearchStyle };
