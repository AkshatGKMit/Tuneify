import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { IconFamily, LibraryType, LibraryType } from '@constants';

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
  type TrackOmittedLibrary = Omit<LibraryType, typeof LibraryType.track>;

  interface LibraryCardProps {
    type: LibraryType;
    library: Album | Artist | Playlist | Track;
  }

  interface CustomHeaderProps extends NativeStackHeaderProps {
    title?: string;
  }

  interface HorizontalLibrariesListProps {
    libraries: Albums | Artists | Playlists | Tracks;
    libraryType: LibraryType;
    title: string;
  }

  type GetDetails = [string, string, string, number, Track[]];

  type DropdownItem = { id: string; label: string };

  type DropdownItems = DropdownItem[];

  type DropdownProps = {
    data: DropdownItems;
    placeholder: string;
    onSelectIndex?: (index: number, value?: string) => void;
    value?: DropdownItem;
    shouldScroll?: boolean;
    style?: StyleProp<ViewStyle>;
    dropdownStyle?: StyleProp<ViewStyle>;
  };
}
