import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors) => {
  return StyleSheet.create({
    section: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    sectionHeader: {
      fontSize: FontSize.titleMedium,
      fontWeight: '700',
      color: theme.primaryTextColor,
    },
    itemSeparatorView: {
      width: 10,
    },
  });
});

export default ThemedStyles;
