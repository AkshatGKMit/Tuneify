import { Sizes } from '@constants';
import { Colors, FontSize } from '@themes';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      appBar: {
        width: '100%',
        height: Sizes.headerHeight * 1.25,
        backgroundColor: theme.screenGradient[0],
        padding: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
        shadowColor: theme.invertedColor,
      },
      searchBox: {
        flex: 1,
        borderRadius: Sizes.headerHeight,
        borderWidth: 2,
        borderColor: theme.primaryColor,
        paddingVertical: 6,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      searchText: {
        textTransform: 'uppercase',
        fontWeight: '900',
        fontSize: FontSize.displaySmall,
        fontFamily: theme.font,
        letterSpacing: 10,
        color: theme.primaryColor,
        textShadowColor: theme.primaryColor,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'left',
      },
      leadingAndTrailingIcon: {
        fontSize: FontSize.headlineLarge,
      },
      starIcon: {
        color: Colors.yellow,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
