import { View, Image } from 'react-native';

import { ComingSoonImage } from '@assets/images';
import GradientScreen from '@components/gradientScreen';
import { GlobalThemedStyles } from '@themes';

import styles from './styles';

const ComingSoon = () => {
  const globalStyles = GlobalThemedStyles();

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
