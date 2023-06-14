declare module '*.woff';
declare module '*.woff2';
declare module '*.otf';

declare module '@mui/private-theming' {
  import type { Theme } from '@mui/material/styles';

  interface SizeOptions {
    xs?: string;
    sm?: string;
    base?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
    '3xl'?: string;
    '4xl'?: string;
    '5xl'?: string;
    '6xl'?: string;
  }
  interface TypographyVariants {
    header: React.CSSProperties;
    menuTitle: React.CSSProperties;
    listTitle: React.CSSProperties;
    contentTitle: React.CSSProperties;
    dialogTitle: React.CSSProperties;
    breadcrumbTag: React.CSSProperties;
    contestLabel: React.CSSProperties;
    chartLabel: React.CSSProperties;
    default: React.CSSProperties;
    base: React.CSSProperties;
    tabTag: React.CSSProperties;
    cardRightInfo: React.CSSProperties;
    helper: React.CSSProperties;
    link: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    header?: React.CSSProperties;
    menuTitle?: React.CSSProperties;
    listTitle?: React.CSSProperties;
    contentTitle?: React.CSSProperties;
    dialogTitle?: React.CSSProperties;
    breadcrumbTag?: React.CSSProperties;
    chartLabel?: React.CSSProperties;
    base?: React.CSSProperties;
    tabTag?: React.CSSProperties;
    emptyInfo?: React.CSSProperties;
    cardRightInfo?: React.CSSProperties;
    helper?: React.CSSProperties;
    link?: React.CSSProperties;
  }

  interface ThemeOptions {
    round?: ThemeOptions['spacing'];
    customShadow?: {
      dialog: React.CSSProperties;
      dropdownList: React.CSSProperties;
      card01: React.CSSProperties;
    };
    iconSize?: SizeOptions;
  }

  interface DefaultTheme extends Theme {
    iconSize: SizeOptions;
  }
}
