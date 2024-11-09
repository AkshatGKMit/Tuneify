import { Colors, FontSize } from '@themes';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: 'white',
        padding: 16,
      },
      placeholder: {
        color: theme.placeholderColor,
      },
      focusDd: {
        borderColor: theme.secondaryTextColor,
      },
      dropdown: {
        height: 40,
        width: 165,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.isDark ? Colors.greyShades.shade800 : Colors.greyShades.shade200,
      },
      ddValue: {
        fontSize: FontSize.labelSmall,
        color: theme.textColor,
        fontFamily: theme.font,
      },
      dropdownList: {
        top: 45,
        width: 165,
        paddingHorizontal: 10,
        elevation: 2,
        borderWidth: 0.1,
        position: 'absolute',
        zIndex: 4,
        backgroundColor: theme.isDark ? Colors.greyShades.shade800 : Colors.greyShades.shade200,
        gap: 10,
      },
      data: {
        padding: 6,
        width: '100%',
        paddingRight: 25,
      },
      dataText: {
        flex: 1,
        fontSize: FontSize.bodyLarge,
        color: theme.textColor,
        fontFamily: theme.font,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
