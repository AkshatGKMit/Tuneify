import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';

const ThemedStyles = (theme: ThemeColors, dimensions: WindowDimensions) => {
  return useMemo(() => {
    const { width: windowWidth } = dimensions;
    return StyleSheet.create({
      screen: {
        flex: 1,
        padding: 20,
      },
      appLogo: {
        height: windowWidth / 4,
        width: windowWidth / 4,
        aspectRatio: 1,
        borderRadius: 12,
        marginBottom: 6,
      },
      appName: {
        fontSize: FontSize.headlineLarge,
        fontWeight: '900',
        color: theme.primaryTextColor,
        marginBottom: 5,
      },
      description: {
        color: theme.textColor,
        fontSize: FontSize.bodyMedium,
        textAlign: 'center',
      },
      signInButton: {
        marginTop: 50,
        width: '100%',
        gap: 10,
        backgroundColor: theme.primaryColor,
        padding: 10,
        borderRadius: 6,
      },
      spotifyIcon: {
        fontSize: FontSize.headlineMedium,
      },
      buttonContent: {
        fontSize: FontSize.bodyLarge,
        fontWeight: '700',
      },
      emptyView: {
        flex: 0.75,
      },
    });
  }, [theme, dimensions]);
};

export default ThemedStyles;
