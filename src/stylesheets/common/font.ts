import { css } from 'styled-components';

const webFont = css`
  // @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&family=Outfit:wght@700&display=swap');

  @font-face {
    font-family: 'NotoSansCJKThin';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Thin.eot');
    src: url('../font/NotoSansCJKkr-Thin.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Thin.woff') format('woff'), url('../font/NotoSansCJKkr-Thin.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Thin.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKDemiLight';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-DemiLight.eot');
    src: url('../font/NotoSansCJKkr-DemiLight.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-DemiLight.woff') format('woff'),
      url('../font/NotoSansCJKkr-DemiLight.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-DemiLight.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKLight';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Light.eot');
    src: url('../font/NotoSansCJKkr-Light.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Light.woff') format('woff'), url('../font/NotoSansCJKkr-Light.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Light.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKRegular';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Regular.eot');
    src: url('../font/NotoSansCJKkr-Regular.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Regular.woff') format('woff'),
      url('../font/NotoSansCJKkr-Regular.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKMedium';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Medium.eot');
    src: url('../font/NotoSansCJKkr-Medium.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Medium.woff') format('woff'),
      url('../font/NotoSansCJKkr-Medium.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Medium.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKBold';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Bold.eot');
    src: url('../font/NotoSansCJKkr-Bold.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Bold.woff') format('woff'), url('../font/NotoSansCJKkr-Bold.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Bold.otf') format('opentype');
  }

  @font-face {
    font-family: 'NotoSansCJKBlack';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url('../font/NotoSansCJKkr-Black.eot');
    src: url('../font/NotoSansCJKkr-Black.eot?#iefix') format('embedded-opentype'),
      url('../font/NotoSansCJKkr-Black.woff') format('woff'), url('../font/NotoSansCJKkr-Black.ttf') format('trueType'),
      url('../font/NotoSansCJKkr-Black.otf') format('opentype');
  }
`;

export default webFont;
