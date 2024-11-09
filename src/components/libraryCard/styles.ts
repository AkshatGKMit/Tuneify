import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';

const ThemedStyles = (theme: ThemeColors, dimensions: WindowDimensions) => {
  return useMemo(() => {
    const { width } = dimensions;

    return StyleSheet.create({
      card: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width / 3.25,
        padding: 6,
      },
      thumbnail: {
        height: width / 3.5,
        width: width / 3.5,
        borderRadius: 8,
      },
      artistThumbnail: {
        borderRadius: width / 7,
      },
      title: {
        fontSize: FontSize.bodyLarge,
        color: theme.textColor,
        marginTop: 2,
        fontFamily: theme.font,
      },
      subtitle: {
        fontSize: FontSize.bodySmall,
        color: theme.secondaryTextColor,
        fontFamily: theme.font,
      },
    });
  }, [theme, dimensions]);
};

export default ThemedStyles;
