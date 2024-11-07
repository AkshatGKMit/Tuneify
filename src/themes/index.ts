import { colorWithOpacity } from '@utility/helpers';
import Colors from './colors';

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export const ThemeColorModes: ThemeColorModes = {
  light: {
    accentColor: Colors.accent.light,
    accentTextColor: Colors.greyShades.shade600,
    defaultIconColor: Colors.black,
    dividerColor: colorWithOpacity(Colors.black, 0.2),
    placeholderColor: Colors.greyShades.shade400,
    primaryColor: Colors.primary.light,
    primaryTextColor: Colors.primary.light,
    screenBGColor: Colors.white,
    screenGradient: [Colors.greyShades.shade100, colorWithOpacity(Colors.greyShades.shade100, 0.3)],
    statusBarColor: Colors.primary.light,
    textColor: Colors.black,
    secondaryTextColor: Colors.greyShades.shade600,
  },
  dark: {
    accentColor: Colors.accent.dark,
    accentTextColor: Colors.greyShades.shade400,
    defaultIconColor: Colors.white,
    dividerColor: colorWithOpacity(Colors.white, 0.2),
    placeholderColor: Colors.greyShades.shade600,
    primaryColor: Colors.primary.dark,
    primaryTextColor: Colors.primary.dark,
    screenBGColor: Colors.black,
    screenGradient: [Colors.greyShades.shade900, colorWithOpacity(Colors.greyShades.shade900, 0.3)],
    statusBarColor: Colors.primary.dark,
    textColor: Colors.white,
    secondaryTextColor: Colors.greyShades.shade400,
  },
};

export const Fonts = {
  Cornerita: 'Cornerita',
  LovelyMamma: 'LovelyMamma',
  PlayfairDisplay: 'PlayfairDisplay',
  Podkova: 'Podkova',
  Texturina: 'Texturina',
} as const;

export const FontSize = {
  displayLarge: 48,
  displayMedium: 36,
  displaySmall: 30,

  headlineLarge: 28,
  headlineMedium: 24,
  headlineSmall: 20,

  titleLarge: 24,
  titleMedium: 20,
  titleSmall: 15,

  labelLarge: 20,
  labelMedium: 17,
  labelSmall: 14,

  bodyLarge: 16,
  bodyMedium: 13,
  bodySmall: 10,
} as const;

export { Colors };
