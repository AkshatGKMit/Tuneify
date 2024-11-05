import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      icon: {
        color: theme.defaultIconColor,
        fontSize: 18,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
