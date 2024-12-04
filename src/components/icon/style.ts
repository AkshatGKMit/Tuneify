import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors) => {
  return StyleSheet.create({
    icon: {
      color: theme.defaultIconColor,
      fontSize: FontSize.bodyLarge,
    },
  });
});

export default ThemedStyles;
