import { StyleSheet } from 'react-native';

import { Colors, FontSize } from '@themes';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors, dimensions: WindowDimensions) => {
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
      fontFamily: theme.font,
    },
    duration: {
      fontSize: FontSize.bodySmall,
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
    },
    favoriteIcon: {
      color: Colors.yellow,
    },
  });
});

export default ThemedStyles;
