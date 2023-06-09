import { createTheme } from '@mui/material/styles';

import { fontFace } from './guideconfig/font';
import { palette } from './guideconfig/palette';

const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: ['NotoSansCJK', 'sans-serif'].join(','),
    body1: {
      fontSize: '12px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFace,
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'span',
          body2: 'span',
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: 'List per Page',
        labelDisplayedRows({ from, to, count }) {
          return `${from}-${to} out of ${count}`;
        },
      },
    },
  },
});

export default theme;
