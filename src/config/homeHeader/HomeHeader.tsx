import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '@components/iconButton';
import { IconFamily, NavigationRoutes } from '@constants';

import ThemedStyles from './styles';
import { displayName as appName } from '../../../app.json';

const HomeHeader = () => {
  const styles = ThemedStyles();

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
