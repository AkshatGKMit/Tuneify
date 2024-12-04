import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors, dimensions: WindowDimensions) => {
  return useMemo(() => {
    const { width } = dimensions;

    return StyleSheet.create({
      card: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width / 3.25,
        padding: 6,
        marginRight: 10,
      },
      thumbnail: {
        height: width / 3.5,
        width: width / 3.5,
        borderRadius: 8,
        backgroundColor: theme.placeholderColor,
      },
      artistThumbnail: {
        borderRadius: width / 7,
      },
      title: {
        height: 10,
        width: width / 5,
        backgroundColor: theme.placeholderColor,
        marginTop: 2,
        marginBottom: 1,
        borderRadius: 10,
      },
      subtitle: {
        height: 8,
        width: width / 8,
        backgroundColor: theme.placeholderColor,
        borderRadius: 10,
      },
    });
  }, [theme, dimensions]);
});

export default ThemedStyles;
