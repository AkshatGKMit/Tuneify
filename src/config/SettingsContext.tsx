import { createContext, useEffect, useState } from 'react';
import { Dimensions, ScaledSize, useColorScheme } from 'react-native';

import StorageManager, { StorageKey } from '@utility/storage';
import { Fonts, ThemeColorModes, ThemeMode } from '@themes/index';

const { height, width } = Dimensions.get('window');

const defaultValue: SettingsContextValues = {
  dimensions: { height, width },
  theme: ThemeColorModes.light,
  switchTheme: () => {},
  isDark: false,
  font: 'LovelyMamma',
  changeFont: () => {},
};

const SettingsContext = createContext<SettingsContextValues>(defaultValue);

export const SettingsContextProvider = ({ children }: ContextProviderProps) => {
  const {
    dimensions: defaultDimensions,
    theme: defaultTheme,
    isDark: defaultIsDark,
    font: defaultFont,
  } = defaultValue;

  const colorScheme = useColorScheme();

  const [dimensions, setDimensions] = useState(defaultDimensions);
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [isDark, setIsDark] = useState<boolean>(defaultIsDark);
  const [font, setFont] = useState<Font>(defaultFont);

  const changeDimensions = ({ window }: { window: ScaledSize }) => {
    setDimensions({
      height: window.height,
      width: window.width,
    });
  };

  const switchTheme = async (themeMode: ThemeModeType) => {
    setTheme(ThemeColorModes[themeMode]);
    setIsDark(themeMode === ThemeMode.dark);
    StorageManager.saveStoreValue(StorageKey.theme, JSON.stringify(themeMode));
  };

  const changeFont = async (font: Font) => {
    setFont(font);
    StorageManager.saveStoreValue(StorageKey.font, JSON.stringify(font));
  };

  const loadStore = async () => {
    const storedThemeMode =
      (await StorageManager.getStoreValue<ThemeModeType>(StorageKey.theme)) ??
      colorScheme ??
      'light';
    setTheme(ThemeColorModes[storedThemeMode]);
    setIsDark(storedThemeMode === ThemeMode.dark);

    const storedFont =
      (await StorageManager.getStoreValue<Font>(StorageKey.font)) ?? Fonts.LovelyMamma;
    setFont(storedFont);
  };

  useEffect(() => {
    const dimensionsEvent = Dimensions.addEventListener('change', changeDimensions);
    changeDimensions({ window: Dimensions.get('window') });

    loadStore();

    return () => {
      dimensionsEvent.remove();
    };
  }, []);

  const contextValues: SettingsContextValues = {
    dimensions,
    theme,
    switchTheme,
    isDark,
    font,
    changeFont,
  };

  return (
    <SettingsContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default SettingsContext;
