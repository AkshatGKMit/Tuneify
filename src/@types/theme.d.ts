import { Fonts, ThemeMode } from '@themes';

declare global {
  type ThemeModeType = keyof typeof ThemeMode;

  interface ThemeColors {
    isDark: boolean;
    primaryColor: string;
    accentColor: string;
    statusBarColor: string;
    screenBGColor: string;
    screenGradient: string[];
    textColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    accentTextColor: string;
    defaultIconColor: string;
    dividerColor: string;
    placeholderColor: string;
    invertedColor: string;
    font: Font;
  }

  interface ThemeColorModes {
    light: ThemeColors;
    dark: ThemeColors;
  }

  export type Font = keyof typeof Fonts;
}
