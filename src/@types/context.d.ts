import { ReactNode } from 'react';

declare global {
  interface ContextProviderProps {
    children?: ReactNode;
  }

  interface WindowDimensions {
    height: number;
    width: number;
  }

  interface SettingsContextValues {
    dimensions: WindowDimensions;
    theme: ThemeColors;
    isDark: boolean;
    switchTheme: (themeMode: ThemeMode) => void;
    font: Font;
    changeFont: (font: Font) => void;
  }

  type StorageKey = 'theme' | 'font';
}
