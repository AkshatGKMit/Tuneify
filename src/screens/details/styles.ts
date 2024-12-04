import { Sizes } from '@constants';
import { Colors, FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors, dimensions: WindowDimensions) => {
  return useMemo(() => {
    const { width } = dimensions;

    return StyleSheet.create({
      imageBackground: {
        height: width * 0.85,
        width: width,
      },
      overlay: {
        height: width * 0.85,
        width: width,
        backgroundColor: colorWithOpacity(Colors.black, 0.4),
      },
      content: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 10,
      },
      backButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 12,
        height: FontSize.displaySmall,
        width: FontSize.displaySmall,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorWithOpacity(Colors.black, 0.6),
      },
      backButtonIcon: {
        color: Colors.white,
      },
      title: {
        fontSize: FontSize.displayLarge,
        color: Colors.white,
        fontWeight: '700',
        fontFamily: theme.font,
      },
      details: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
      },
      subtitle: {
        fontSize: FontSize.titleMedium,
        color: Colors.greyShades.shade200,
        fontWeight: '500',
        fontFamily: theme.font,
      },
      listHeader: {
        height: Sizes.headerHeight,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: theme.screenGradient[0],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        shadowColor: theme.invertedColor,
      },
      headerTitle: {
        fontSize: FontSize.titleLarge,
        color: theme.primaryTextColor,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: theme.font,
      },
      itemSeparator: {
        height: 15,
      },
      list: {
        paddingVertical: 20,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
