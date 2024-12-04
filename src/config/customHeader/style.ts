import { StyleSheet } from 'react-native';

import { Sizes } from '@constants';
import { Colors, FontSize } from '@themes';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme: ThemeColors) => {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.primaryColor,
      width: '100%',
      height: Sizes.headerHeight,
      padding: 4,
      paddingStart: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      gap: 10,
      borderBottomWidth: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    headerText: {
      fontSize: 24,
      fontWeight: '700',
      color: Colors.black,
      fontFamily: theme.font,
    },
    icon: {
      color: Colors.black,
      fontSize: FontSize.headlineMedium,
    },
  });
});

export default ThemedStyles;
