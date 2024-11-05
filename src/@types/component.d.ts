import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconFamily } from '@constants/constants';

declare global {
  type IconFamilyType = keyof typeof IconFamily;

  type IconProps = {
    family: IconFamilyType;
    name: string;
    style?: StyleProp<TextStyle>;
  };

  type IconBtnProps = {
    family: IconFamilyType;
    name: string;
    iconStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
    onPress?: (ev?: GestureResponderEvent) => void;
  };
}
