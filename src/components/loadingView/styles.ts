import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors) => {
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
      fontFamily: theme.font,
    },
  });
});

export default ThemedStyles;
