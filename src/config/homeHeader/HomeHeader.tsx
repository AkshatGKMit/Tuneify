import { View, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import ThemedStyles from './styles';
import SettingsContext from '@config/SettingsContext';
import IconButton from '@components/iconButton';
import { IconFamily, NavigationRoutes } from '@constants';
import Icon from '@components/icon';
import { displayName as appName } from '../../../app.json';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  const { navigate } = useNavigation<StackNavigation>();

  return (
    <View style={styles.appBar}>
      <Text style={styles.searchText}>{appName}</Text>
      <IconButton
        family={IconFamily.MaterialIcons}
        name="settings"
        iconStyle={styles.leadingAndTrailingIcon}
        onPress={() => {
          navigate(NavigationRoutes.Settings);
        }}
      />
    </View>
  );
};

export default HomeHeader;
