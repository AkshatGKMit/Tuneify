import { useContext } from 'react';
import { View, Text } from 'react-native';

import IconButton from '@components/iconButton';
import SettingsContext from '@config/SettingsContext';
import { IconFamily } from '@constants';

import ThemedStyles from './style';

const CustomHeader = ({ navigation, title }: CustomHeaderProps) => {
  const { goBack } = navigation;

  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  return (
    <View style={styles.header}>
      <IconButton
        family={IconFamily.Feather}
        name="arrow-left"
        iconStyle={styles.icon}
        onPress={goBack}
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
