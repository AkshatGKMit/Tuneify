import { Fonts, ThemeMode } from '@themes/index';

declare global {
  type ThemeModeType = keyof typeof ThemeMode;

  interface ThemeColors {
    primaryColor: string;
    accentColor: string;
    statusBarColor: string;
    screenBGColor: string;
    screenGradient: string[];
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
