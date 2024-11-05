import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const IconFamily = {
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  Fontisto: 'Fontisto',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
} as const;
