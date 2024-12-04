import { StyleSheet } from 'react-native';

import { createThemedStyles } from '@utility/styles';

const GlobalThemedStyles = createThemedStyles((theme) => {
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
    globalGp: {
      gap: 20,
    },
  });
});

export default GlobalThemedStyles;
