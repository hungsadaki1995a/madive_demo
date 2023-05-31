declare module '*.woff';
declare module '*.woff2';
declare module '*.otf';

declare module '@mui/private-theming' {
  import type { Theme } from '@mui/material/styles';

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
