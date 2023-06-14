import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import layoutTheme from './guideconfig/layout';
import themePalette from './guideconfig/palette';

const theme = createTheme(deepmerge(themePalette, layoutTheme));

export default theme;
