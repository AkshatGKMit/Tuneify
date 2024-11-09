import {
  Text,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  DevSettings,
  TouchableOpacity,
  View,
} from 'react-native';
import { warningErrorImage } from '@assets/images';
import globalAppStyles from '@themes/globalStyles';
import { GlobalThemedStyles } from '@themes';
import { useContext, useMemo } from 'react';
import SettingsContext from '@config/SettingsContext';
import ThemedStyles from './styles';
import GradientScreen from '@components/gradientScreen';
import { displayName as appName } from '../../../app.json';

const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  const { theme } = useContext(SettingsContext);
  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme);

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
