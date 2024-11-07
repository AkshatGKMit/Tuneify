import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconFamily, LibraryType } from '@constants';

declare global {
  type IconFamilyType = keyof typeof IconFamily;

  interface IconProps {
    family: IconFamilyType;
    name: string;
    style?: StyleProp<TextStyle>;
  }

  interface IconBtnProps {
    family: IconFamilyType;
    name: string;
    iconStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
    onPress?: (ev?: GestureResponderEvent) => void;
  }

  interface GradientScreenProps {
    children: ReactNode;
  }

  type LibraryType = keyof typeof LibraryType;

  interface LibraryCardProps {
    type: LibraryType;
    library: Album | Artist | Playlist | Track;
  }
}
