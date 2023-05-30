import { createTheme } from '@mui/material/styles';

import { fontFace } from './guideconfig/font';
import { palette } from './guideconfig/palette';

const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: ['NotoSansCJK', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFace,
    },
  },
});

export default theme;
