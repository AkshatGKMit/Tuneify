import { View, Text, Switch, TouchableHighlight } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import { ReactNode, useContext } from 'react';
import Icon from '@components/icon';
import ThemedStyles from './styles';
import SettingsContext from '@config/SettingsContext';
import { Colors, Fonts, GlobalThemedStyles, ThemeMode } from '@themes';
import { IconFamily } from '@constants';
import Dropdown from '@components/dropdown';
import TokenContext from '@config/TokenContext';
import { colorWithOpacity } from '@utility/helpers';

const Settings = () => {
  const { logout } = useContext(TokenContext);
  const { theme, isDark, switchTheme, font, changeFont } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme);

  const onSwitchTheme = (val: boolean) => {
    switchTheme(val ? ThemeMode.dark : ThemeMode.light);
  };

  const onFontSelect = (index: number) => {
    changeFont(Object.values(Fonts)[index]);
  };

  const fontLabel = (font: Font): DropdownItem => {
    switch (font) {
      case 'Cornerita':
        return { id: 'Cornerita', label: 'Cornerita' };
      case 'LovelyMamma':
        return { id: 'LovelyMamma', label: 'Lovely Mamma' };
      case 'PlayfairDisplay':
        return { id: 'PlayfairDisplay', label: 'Playfair Display' };
      case 'Podkova':
        return { id: 'Podkova', label: 'Podkova' };
      case 'Texturina':
        return { id: 'Texturina', label: 'Texturina' };

      default:
        return { id: 'Default', label: 'Default' };
    }
  };

  const highlightUnderlayColor = colorWithOpacity(
    isDark ? Colors.greyShades.shade200 : Colors.greyShades.shade800,
    0.1,
  );

  return (
    <GradientScreen>
      <View style={styles.content}>
        <SettingRow
          icon={{ family: IconFamily.MaterialIcons, name: 'dark-mode' }}
          label="Dark Theme"
          end={
            <Switch
              style={styles.switch}
              value={theme.isDark}
              onValueChange={onSwitchTheme}
              thumbColor={theme.primaryColor}
              trackColor={{ false: theme.accentColor, true: theme.accentColor }}
            />
          }
        />
        <SettingRow
          icon={{ family: IconFamily.FontAwesome, name: 'font' }}
          label="Fonts"
          end={
            <Dropdown
              data={Object.values(Fonts).map((f: Font) => fontLabel(f))}
              placeholder="--Select Font--"
              value={fontLabel(font)}
              onSelectIndex={onFontSelect}
            />
          }
        />
        <TouchableHighlight
          style={[globalStyles.rowCenter, styles.signInButton]}
          underlayColor={highlightUnderlayColor}
          onPress={logout}
        >
          <>
            <Text style={styles.buttonContent}>Logout</Text>
            <Icon
              family={IconFamily.MaterialIcons}
              name="logout"
              style={styles.spotifyIcon}
            />
          </>
        </TouchableHighlight>
      </View>
    </GradientScreen>
  );
};

const SettingRow = ({ icon, label, end }: { icon: IconProps; label: string; end: ReactNode }) => {
  const { theme, dimensions } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  return (
    <View style={styles.setting}>
      <View style={styles.initials}>
        <Icon
          family={icon.family}
          name={icon.name}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>{label}</Text>
      </View>
      {end}
    </View>
  );
};

export default Settings;
