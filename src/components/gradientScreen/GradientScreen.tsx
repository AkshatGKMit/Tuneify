import LinearGradient from 'react-native-linear-gradient';

import GlobalThemedStyles from '@themes/globalStyles';
import { useAppSelector } from '@store';

const GradientScreen = ({ children }: GradientScreenProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const globalStyles = GlobalThemedStyles();

  return (
    <LinearGradient
      colors={theme.screenGradient}
      style={globalStyles.screen}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientScreen;
