import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import Colors from '@themes/colors';

const ThemedStyles = (theme: ThemeColors, dimensions: WindowDimensions) => {
  return useMemo(() => {
    const { width } = dimensions;
    return StyleSheet.create({
      tile: {
        flexDirection: 'row',
        alignItems: 'center',
        height: width * 0.135,
        width: '100%',
        paddingTop: 6,
        paddingHorizontal: 10,
        gap: 10,
      },
      icon: {
        fontSize: FontSize.titleLarge,
      },
      thumbnail: {
        height: width * 0.135,
        width: width * 0.135,
        borderRadius: 8,
      },
      info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      title: {
        fontSize: FontSize.bodyLarge,
        color: theme.textColor,
      },
      duration: {
        fontSize: FontSize.bodySmall,
        color: theme.secondaryTextColor,
      },
      favoriteIcon: {
        color: Colors.yellow,
      },
    });
  }, [theme, dimensions]);
};

export default ThemedStyles;
