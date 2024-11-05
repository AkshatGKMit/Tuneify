import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme.screenBGColor,
      },
      rowCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      columnCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    });
  }, [theme]);
};

export default ThemedStyles;
