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
    statusBarColor: Colors.primary.light,
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
    statusBarColor: Colors.primary.dark,
  },
};

export const Fonts = {
  Cornerita: 'Cornerita',
  LovelyMamma: 'LovelyMamma',
  PlayfairDisplay: 'PlayfairDisplay',
  Podkova: 'Podkova',
  Texturina: 'Texturina',
} as const;
