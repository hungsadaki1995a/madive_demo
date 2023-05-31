import { ComponentsOverrides, Theme } from '@mui/material';

import fontBlackOtf from '../../stylesheets/font/NotoSansKR-Black.otf';
import fontBlackWoff from '../../stylesheets/font/NotoSansKR-Black.woff';
import fontBlackWoff2 from '../../stylesheets/font/NotoSansKR-Black.woff2';
import fontBoldOtf from '../../stylesheets/font/NotoSansKR-Bold.otf';
import fontBoldWoff from '../../stylesheets/font/NotoSansKR-Bold.woff';
import fontBoldWoff2 from '../../stylesheets/font/NotoSansKR-Bold.woff2';
import fontLightOtf from '../../stylesheets/font/NotoSansKR-Light.otf';
import fontLightWoff from '../../stylesheets/font/NotoSansKR-Light.woff';
import fontLightWoff2 from '../../stylesheets/font/NotoSansKR-Light.woff2';
import fontMediumOtf from '../../stylesheets/font/NotoSansKR-Medium.otf';
import fontMediumWoff from '../../stylesheets/font/NotoSansKR-Medium.woff';
import fontMediumWoff2 from '../../stylesheets/font/NotoSansKR-Medium.woff2';
import fontRegularOtf from '../../stylesheets/font/NotoSansKR-Regular.otf';
import fontRegularWoff from '../../stylesheets/font/NotoSansKR-Regular.woff';
import fontRegularWoff2 from '../../stylesheets/font/NotoSansKR-Regular.woff2';
import fontThinOtf from '../../stylesheets/font/NotoSansKR-Thin.otf';
import fontThinWoff from '../../stylesheets/font/NotoSansKR-Thin.woff';
import fontThinWoff2 from '../../stylesheets/font/NotoSansKR-Thin.woff2';

export const fontFace: ComponentsOverrides<Theme>['MuiCssBaseline'] = `
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 100;
  src: url(${fontThinWoff2}) format('woff2'), url(${fontThinWoff}) format('woff'),
    url(${fontThinOtf}) format('opentype');
}
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 300;
  src: url(${fontLightWoff2}) format('woff2'), url(${fontLightWoff}) format('woff'),
    url(${fontLightOtf}) format('opentype');
}
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 400;
  src: url(${fontRegularWoff2}) format('woff2'), url(${fontRegularWoff}) format('woff'),
    url(${fontRegularOtf}) format('opentype');
}
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 500;
  src: url(${fontMediumWoff2}) format('woff2'), url(${fontMediumWoff}) format('woff'),
    url(${fontMediumOtf}) format('opentype');
}
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 700;
  src: url(${fontBoldWoff2}) format('woff2'), url(${fontBoldWoff}) format('woff'),
    url(${fontBoldOtf}) format('opentype');
}
@font-face {
  font-family: 'NotoSansCJK';
  font-style: normal;
  font-weight: 900;
  src: url(${fontBlackWoff2}) format('woff2'), url(${fontBlackWoff}) format('woff'),
    url(${fontBlackOtf}) format('opentype');
}
`;
