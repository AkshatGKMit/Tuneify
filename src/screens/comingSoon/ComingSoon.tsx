import { ComingSoonImage } from '@assets/images';
import GradientScreen from '@components/gradientScreen';
import SettingsContext from '@config/SettingsContext';
import { GlobalThemedStyles } from '@themes';
import { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const ComingSoon = () => {
  const { theme } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);

  return (
    <GradientScreen>
      <View style={[globalStyles.columnCenter, styles.screen]}>
        <Image
          source={ComingSoonImage}
          style={styles.comingSoonImage}
        />
      </View>
    </GradientScreen>
  );
};

export default ComingSoon;
