import { FontSize } from '@themes';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
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
  }, [theme]);
};

export default ThemedStyles;
