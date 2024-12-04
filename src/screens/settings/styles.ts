import { isIos } from '@constants';
import { Colors, FontSize } from '@themes';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      content: {
        paddingHorizontal: 10,
        paddingVertical: 20,
      },
      setting: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      initials: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      },
      buttonText: {
        fontSize: FontSize.labelLarge,
        color: theme.primaryTextColor,
        fontFamily: theme.font,
      },
      icon: {
        fontSize: 22,
      },
      value: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      switch: {
        transform: [{ scale: isIos ? 0.75 : 1 }],
      },
      separator: {
        width: '100%',
        height: 1,
        backgroundColor: theme.placeholderColor,
      },
      signInButton: {
        marginTop: 50,
        width: '100%',
        gap: 10,
        backgroundColor: '#FF6665',
        padding: 10,
        borderRadius: 6,
      },
      spotifyIcon: {
        fontSize: FontSize.bodyLarge,
        color: Colors.white,
      },
      buttonContent: {
        fontSize: FontSize.bodyLarge,
        fontWeight: '700',
        fontFamily: theme.font,
        color: Colors.white,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
