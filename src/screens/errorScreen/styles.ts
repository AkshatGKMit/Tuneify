import { StyleSheet } from 'react-native';

import { Colors, FontSize } from '@themes';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    errorView: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    imageView: {
      width: '25%',
      height: 100,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    errorHeading: {
      fontSize: 35,
      fontWeight: '800',
      color: theme.primaryTextColor,
      marginBottom: 5,
    },
    message: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 20,
      color: theme.textColor,
    },
    retryButton: {
      backgroundColor: theme.primaryTextColor,
      borderRadius: 12,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginVertical: 6,
    },
    textButton: {
      color: theme.isDark ? Colors.black : Colors.white,
      fontSize: FontSize.labelMedium,
    },
  });
});

export default ThemedStyles;
