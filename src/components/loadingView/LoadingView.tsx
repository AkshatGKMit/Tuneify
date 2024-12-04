import { View, Text, ActivityIndicator } from 'react-native';

import ThemedStyles from './styles';
import { useAppSelector } from '@store';

const LoadingView = ({ processInfo }: { processInfo?: string }) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const styles = ThemedStyles();

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
