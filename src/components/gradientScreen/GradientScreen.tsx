import { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import SettingsContext from '@config/SettingsContext';

import GlobalThemedStyles from '@themes/globalStyles';

const GradientScreen = ({ children }: GradientScreenProps) => {
  const { theme } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);

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
