import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      loaderView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colorWithOpacity(theme.invertedColor, 0.75),
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      },
      processInfo: {
        color: theme.screenBGColor,
        fontSize: FontSize.labelMedium,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
