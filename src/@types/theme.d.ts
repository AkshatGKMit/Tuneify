import { Fonts } from '@themes/index';

declare global {
  type ThemeMode = 'light' | 'dark';

  interface ThemeColors {
    primaryColor: string;
    accentColor: string;
    statusBarColor: string;
    screenBGColor: string;
    primaryTextColor: string;
    accentTextColor: string;
    defaultIconColor: string;
    dividerColor: string;
    placeholderColor: string;
  }

  interface ThemeColorModes {
    light: ThemeColors;
    dark: ThemeColors;
  }

  export type Font = keyof typeof Fonts;
}
