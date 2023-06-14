import { alpha, Color } from '@mui/material';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface NeutralLightColor extends Color {
    0: string;
    25: string;
    150: string;
  }
  interface Palette {
    neutralLight: NeutralLightColor;
    neutralDark: Palette['grey'];
    purple: Palette['grey'];
    blue: Palette['grey'];
    green: Palette['grey'];
    red: Palette['grey'];
    orange: Palette['grey'];
    yellow: Palette['grey'];
    icon: Palette['text'];
    button: Palette['text'];
    primaryButton?: Palette['primary'];
  }

  interface PaletteOptions {
    neutralLight: Partial<NeutralLightColor>;
    neutralDark: PaletteOptions['grey'];
    purple: PaletteOptions['grey'];
    blue: PaletteOptions['grey'];
    green: PaletteOptions['grey'];
    red: PaletteOptions['grey'];
    orange: PaletteOptions['grey'];
    yellow: PaletteOptions['grey'];
    icon?: PaletteOptions['text'];
    button?: PaletteOptions['text'];
    primaryButton?: PaletteOptions['primary'];
  }

  interface TypeText {
    placeholder?: TypeText['primary'];
    branPrimary?: TypeText['primary'];
    brandSecondary?: TypeText['primary'];
    error?: TypeText['primary'];
    link?: TypeText['primary'];
  }
}

let themePalette = createTheme({
  palette: {
    neutralDark: {
      '500': '#9A9BA0',
    },
    neutralLight: {
      '0': '#FFFFFF',
      '25': alpha('#F5F6F7', 0.5),
      '50': '#F5F6F7',
      '100': '#ECEEF0',
      '150': '#DEDFE2',
      '200': '#D3D5DA',
      '300': '#B9BDC3',
      '400': '#9EA4AC',
      '500': '#7A828E',
      '600': '#5E6777',
      '700': '#434D5F',
      '800': '#1C293E',
      '900': '#0F1722',
    },
    purple: {
      '50': '#F1ECFF',
      '100': '#DACEFF',
      '200': '#BEA9FD',
      '300': '#A182FC',
      '400': '#8E69FC',
      '500': '#7244FB',
      '600': '#6137DF',
      '700': '#5130B2',
      '800': '#3F258A',
      '900': '#301D69',
    },
    blue: {
      '50': '#E8F5FE',
      '100': '#C9E8FF',
      '200': '#95D0FA',
      '300': '#64BAF8',
      '400': '#46ADF7',
      '500': '#1898F5',
      '600': '#0485E3',
      '700': '#116CAE',
      '800': '#0D5487',
      '900': '#0A4067',
    },
    green: {
      '50': '#EAF9F3',
      '100': '#BFEBDB',
      '200': '#A0E1CA',
      '300': '#74D3B1',
      '400': '#59CBA2',
      '500': '#30BE8B',
      '600': '#2CAD7E',
      '700': '#228763',
      '800': '#1A694C',
      '900': '#14503A',
    },
    red: {
      '50': '#FDECEB',
      '100': '#FAC5C0',
      '200': '#F8A9A1',
      '300': '#F48276',
      '400': '#F2695C',
      '500': '#EF4433',
      '600': '#D93E2E',
      '700': '#AA3024',
      '800': '#83251C',
      '900': '#641D15',
    },
    orange: {
      '50': '#FFF4E7',
      '100': '#FFDCB5',
      '200': '#FFCB91',
      '300': '#FFB35E',
      '400': '#FFA23B',
      '500': '#FF8B0A',
      '600': '#E8800E',
      '700': '#B5640B',
      '800': '#8C4E08',
      '900': '#6B3B06',
    },
    yellow: {
      '50': '#FFF8EB',
      '100': '#FEEAC2',
      '200': '#FEE0A5',
      '300': '#FFD584',
      '400': '#FFC85A',
      '500': '#FEB72C',
      '600': '#EAA317',
      '700': '#BD861A',
      '800': '#8B6720',
      '900': '#6A4F19',
    },
  },
});

themePalette = createTheme(themePalette, {
  palette: {
    text: {
      primary: themePalette.palette.neutralLight[800],
      secondary: themePalette.palette.neutralLight[500],
      placeholder: themePalette.palette.neutralLight[400],
      disabled: themePalette.palette.neutralLight[300],
      brandPrimary: themePalette.palette.purple[600],
      brandSecondary: themePalette.palette.blue[600],
      inverse: themePalette.palette.common.white,
      error: themePalette.palette.red[600],
      link: themePalette.palette.blue[500],
    },
    icon: {
      primary: themePalette.palette.neutralLight[700],
      secondary: themePalette.palette.neutralLight[400],
      disabled: themePalette.palette.neutralLight[200],
      brandPrimary: themePalette.palette.purple[500],
      brandSecondary: themePalette.palette.blue[500],
      inverse: themePalette.palette.common.white,
      error: themePalette.palette.red[500],
    },
    button: {
      primary: themePalette.palette.purple[500],
      primaryHover: themePalette.palette.purple[600],
      primaryActive: themePalette.palette.purple[700],
      primaryDisabled: themePalette.palette.neutralLight[100],
      secondary01: themePalette.palette.common.white,
      secondaryHover01: themePalette.palette.neutralLight[100],
      secondaryActive01: themePalette.palette.neutralLight[150],
      secondary02: themePalette.palette.neutralLight[100],
      secondaryHover02: themePalette.palette.neutralLight[150],
      secondaryActive02: themePalette.palette.neutralLight[200],
      danger: themePalette.palette.red[500],
      dangerHover: themePalette.palette.red[600],
      dangerActive: themePalette.palette.red[700],
    },
    field: {
      primary: themePalette.palette.common.white,
      hover: themePalette.palette.neutralLight[50],
    },
    status: {
      fail: themePalette.palette.orange[500],
      success: themePalette.palette.green[500],
      severe: themePalette.palette.red[500],
      critical: themePalette.palette.orange[500],
      warning: themePalette.palette.yellow[500],
      info: themePalette.palette.blue[500],
      normal: themePalette.palette.green[500],
      error: themePalette.palette.red[500],
      stop: themePalette.palette.neutralDark[500],
      running: themePalette.palette.green[500],
    },
    border: {
      '01': themePalette.palette.neutralLight[150],
      '02': themePalette.palette.neutralLight[200],
      '03': themePalette.palette.neutralLight[700],
      '04': themePalette.palette.neutralLight[500],
      '05': themePalette.palette.neutralLight[150],
      brandPrimary: themePalette.palette.purple[500],
      brandSecondary: themePalette.palette.blue[500],
      disabled: themePalette.palette.neutralLight[100],
    },
    background: {
      '01': themePalette.palette.neutralLight[0],
      '02': themePalette.palette.neutralLight[25],
      '03': themePalette.palette.neutralLight[50],
    },
    layer: {
      '01': themePalette.palette.neutralLight[0],
      hover01: themePalette.palette.neutralLight[50],
      active01: themePalette.palette.neutralLight[150],
      selected01: themePalette.palette.neutralLight[100],
      '02': themePalette.palette.neutralLight[50],
      hover02: themePalette.palette.neutralLight[100],
      active02: themePalette.palette.neutralLight[200],
      selected02: themePalette.palette.neutralLight[150],
      '03': themePalette.palette.neutralLight[100],
      hover03: themePalette.palette.neutralLight[150],
      active03: themePalette.palette.neutralLight[200],
      selected03: themePalette.palette.neutralLight[150],
      '04': themePalette.palette.neutralLight[150],
      hover04: themePalette.palette.neutralLight[200],
      selected04: themePalette.palette.neutralLight[100],
      accentSelected01: themePalette.palette.blue[50],
      accentSelected02: themePalette.palette.blue[100],
      accentHover03: themePalette.palette.purple[50],
      accentActive03: themePalette.palette.purple[100],
    },
  },
});

export default themePalette;
