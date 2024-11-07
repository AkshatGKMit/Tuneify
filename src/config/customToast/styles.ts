import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import Colors from '@themes/colors';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      baseContainer: {
        borderLeftWidth: 0,
        height: FontSize.displayMedium,
        borderRadius: 50,
      },
      infoToast: {
        backgroundColor: Colors.toast.infoBackground,
      },
      successToast: {
        backgroundColor: Colors.toast.successBackground,
      },
      errorToast: {
        backgroundColor: Colors.toast.errorBackground,
      },
      iconView: {
        width: '12%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        fontSize: FontSize.titleLarge,
      },
      infoToastIcon: {
        color: Colors.toast.infoIconColor,
      },
      successToastIcon: {
        color: Colors.toast.successIconColor,
      },
      errorToastIcon: {
        color: Colors.toast.errorIconColor,
      },
      content: {
        paddingHorizontal: 0,
        marginRight: 15,
      },
      title: {
        fontSize: FontSize.labelMedium,
        color: Colors.black,
        fontWeight: '500',
        marginBottom: 0,
      },
      subtitle: {
        display: 'none',
      },
    });
  }, [theme]);
};

export default ThemedStyles;
