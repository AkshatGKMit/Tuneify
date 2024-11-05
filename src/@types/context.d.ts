import { ReactNode } from 'react';

import { StorageKey } from '@utility/storage';

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
    switchTheme: (themeMode: ThemeModeType) => void;
    font: Font;
    changeFont: (font: Font) => void;
  }

  type StorageKeyType = keyof typeof StorageKey;
}
