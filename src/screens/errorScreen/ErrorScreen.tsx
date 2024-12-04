import { Text, SafeAreaView, Image, DevSettings, TouchableOpacity, View } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import { warningErrorImage } from '@assets/images';
import { GlobalThemedStyles } from '@themes';

import ThemedStyles from './styles';
import { displayName as appName } from '../../../app.json';

const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  return (
    <SafeAreaView style={[globalStyles.screen]}>
      <GradientScreen>
        <View style={[styles.screen, globalStyles.columnCenter]}>
          <Image
            source={warningErrorImage}
            style={styles.imageView}
          />
          <Text style={styles.errorHeading}>Oops! Error</Text>
          <Text style={styles.message}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
          >
            <Text style={styles.textButton}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => DevSettings.reload('Refresh app to resolve error')}
          >
            <Text style={styles.textButton}>Restart {appName}</Text>
          </TouchableOpacity>
        </View>
      </GradientScreen>
    </SafeAreaView>
  );
};

export default ErrorScreen;
