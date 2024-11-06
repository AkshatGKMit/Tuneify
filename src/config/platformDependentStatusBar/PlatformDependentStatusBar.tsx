import { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import SettingsContext from '@config/SettingsContext';

import { isIos } from '@constants';
import ThemedStyles from './styles';

const PlatformDependentStatusBar = () => {
  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  if (!isIos) {
    return (
      <StatusBar
        animated
        barStyle={'dark-content'}
        backgroundColor={theme.statusBarColor}
      />
    );
  }

  return <View style={styles.iosStatusBar} />;
};

export default PlatformDependentStatusBar;
