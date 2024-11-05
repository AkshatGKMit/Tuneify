import { createContext, useEffect, useState } from 'react';
import { Dimensions, ScaledSize, useColorScheme } from 'react-native';
import StorageManager from '@utility/storage';
import { ThemeColorModes } from '@themes/index';

const { height, width } = Dimensions.get('window');

const defaultValue: SettingsCtxValues = {
  dimensions: { height, width },
  theme: ThemeColorModes.light,
  switchTheme: () => {},
  isDark: false,
  font: 'LovelyMamma',
  changeFont: () => {},
};

const SettingsContext = createContext<SettingsCtxValues>(defaultValue);

export const SettingsContextProvider = ({ children }: CtxProviderProps) => {
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

  const switchTheme = async (themeMode: ThemeMode) => {
    setTheme(ThemeColorModes[themeMode]);
    setIsDark(themeMode === 'dark');
    StorageManager.saveStoreValue('theme', JSON.stringify(themeMode));
  };

  const changeFont = async (font: Font) => {
    setFont(font);
    StorageManager.saveStoreValue('font', JSON.stringify(font));
  };

  const loadStore = async () => {
    const storedThemeMode =
      (await StorageManager.getStoreValue<ThemeMode>('theme')) ?? colorScheme ?? 'light';
    setTheme(ThemeColorModes[storedThemeMode]);
    setIsDark(storedThemeMode === 'dark');

    const storedFont = (await StorageManager.getStoreValue<Font>('font')) ?? 'LovelyMamma';
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

  const ctxValues: SettingsCtxValues = {
    dimensions,
    theme,
    switchTheme,
    isDark,
    font,
    changeFont,
  };

  return (
    <SettingsContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default SettingsContext;
