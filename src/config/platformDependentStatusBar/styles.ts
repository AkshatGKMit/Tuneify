import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors, _, insets) => {
  const statusBarHeight = insets.top;

  return useMemo(() => {
    return StyleSheet.create({
      iosStatusBar: {
        height: statusBarHeight,
        width: '100%',
        backgroundColor: theme.statusBarColor,
      },
    });
  }, [theme, statusBarHeight]);
});

export default ThemedStyles;
