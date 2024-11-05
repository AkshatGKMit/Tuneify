import { useContext } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import SettingsContext from '@config/SettingsContext';

import ThemedStyles from './style';

const iconFamilies = {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
};

const Icon = ({ family, name, style }: IconProps) => {
  const { theme } = useContext(SettingsContext);

  const styles = ThemedStyles(theme);

  const SelectedIcon = iconFamilies[family];

  return SelectedIcon ? (
    <SelectedIcon
      name={name}
      style={[styles.icon, style]}
    />
  ) : null;
};

export default Icon;