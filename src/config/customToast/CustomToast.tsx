import { useContext } from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, BaseToastProps, ToastConfig } from 'react-native-toast-message';

import Icon from '@components/icon';

import SettingsContext from '@config/SettingsContext';

import { IconFamily } from '@constants';

import ThemedStyles from './styles';

const CustomToast = () => {
  const {
    theme,
    dimensions: { height },
  } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  const toastAttributes: BaseToastProps = {
    contentContainerStyle: styles.content,
    text1Style: styles.title,
    text1NumberOfLines: 1,
    text1Props: { ellipsizeMode: 'tail' },
    text2Style: styles.subtitle,
  };

  const toastConfig: ToastConfig = {
    info: (props) => (
      <BaseToast
        {...props}
        {...toastAttributes}
        style={[styles.baseContainer, styles.infoToast]}
        renderLeadingIcon={() => (
          <View style={styles.iconView}>
            <Icon
              family={IconFamily.MaterialIcons}
              name="info"
              style={[styles.icon, styles.infoToastIcon]}
            />
          </View>
        )}
      />
    ),
    success: (props) => (
      <BaseToast
        {...props}
        {...toastAttributes}
        style={[styles.baseContainer, styles.successToast]}
        renderLeadingIcon={() => (
          <View style={styles.iconView}>
            <Icon
              family={IconFamily.MaterialIcons}
              name="check-circle"
              style={[styles.icon, styles.successToastIcon]}
            />
          </View>
        )}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        {...toastAttributes}
        style={[styles.baseContainer, styles.errorToast]}
        renderLeadingIcon={() => (
          <View style={styles.iconView}>
            <Icon
              family={IconFamily.MaterialIcons}
              name="error"
              style={[styles.icon, styles.errorToastIcon]}
            />
          </View>
        )}
      />
    ),
  };

  return (
    <Toast
      position="bottom"
      visibilityTime={3}
      bottomOffset={height / 10}
      config={toastConfig}
    />
  );
};

export default CustomToast;
