import { ReactNode } from 'react';

declare global {
  interface CtxProviderProps {
    children?: ReactNode;
  }

  interface WindowDimensions {
    height: number;
    width: number;
  }

  interface SettingsCtxValues {
    dimensions: WindowDimensions;
    theme: ThemeColors;
    isDark: boolean;
    switchTheme: (themeMode: ThemeMode) => void;
    font: Font;
    changeFont: (font: Font) => void;
  }

  type StorageKey = 'theme' | 'font';

  interface StorageCtxValues {
    darkTheme: boolean;
    changeTheme: (dark: boolean) => void;
    storedFont: Font;
    changeStoredFont: (font: Font) => void;
  }
}
