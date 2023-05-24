import { css } from 'styled-components';

const webFont = css`
  @font-face {
    font-family: 'NotoSansCJKThin';
    font-style: normal;
    font-weight: 100;
    src: url(../fonts/NotoSansKR-Thin.woff2) format('woff2'), url(../fonts/NotoSansKR-Thin.woff) format('woff'),
      url(../fonts/NotoSansKR-Thin.otf) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKLight';
    font-style: normal;
    font-weight: 300;
    src: url(../fonts/NotoSansKR-Light.woff2) format('woff2'), url(../fonts/NotoSansKR-Light.woff) format('woff'),
      url(../fonts/NotoSansKR-Light.otf) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKRegular';
    font-style: normal;
    font-weight: 400;
    src: url(../fonts/NotoSansKR-Regular.woff2) format('woff2'), url(../fonts/NotoSansKR-Regular.woff) format('woff'),
      url(../fonts/NotoSansKR-Regular.otf) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKMedium';
    font-style: normal;
    font-weight: 500;
    src: url(../fonts/NotoSansKR-Medium.woff2) format('woff2'), url(../fonts/NotoSansKR-Medium.woff) format('woff'),
      url(../fonts/NotoSansKR-Medium.otf) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKBold';
    font-style: normal;
    font-weight: 700;
    src: url(../fonts/NotoSansKR-Bold.woff2) format('woff2'), url(../fonts/NotoSansKR-Bold.woff) format('woff'),
      url(../fonts/NotoSansKR-Bold.otf) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKBlack';
    font-style: normal;
    font-weight: 900;
    src: url(../fonts/NotoSansKR-Black.woff2) format('woff2'), url(../fonts/NotoSansKR-Black.woff) format('woff'),
      url(../fonts/NotoSansKR-Black.otf) format('opentype');
  }
`;

export default webFont;
