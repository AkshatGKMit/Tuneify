import { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import SettingsContext from '@config/SettingsContext';
import ThemedStyles from './styles';

const LoadingView = ({ processInfo }: { processInfo: string }) => {
  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  return (
    <View style={styles.loaderView}>
      <ActivityIndicator
        color={theme.screenBGColor}
        size={'large'}
        animating
      />
      <Text style={styles.processInfo}>{processInfo}</Text>
    </View>
  );
};

export default LoadingView;
