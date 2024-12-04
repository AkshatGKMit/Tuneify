import { Fonts, ThemeMode } from '@themes';

declare global {
  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

  type ThemeModeType = (typeof ThemeMode)[keyof typeof ThemeMode];

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

  export type Font = (typeof Fonts)[keyof typeof Fonts];

  interface SafeAreaInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
}
