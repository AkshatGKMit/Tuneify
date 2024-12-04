import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export const STORE_CONSTANTS = {
  THEME: {
    NAME: 'theme',
    ACTIONS: {
      SWITCH: 'switch',
    },
  },
  USER: {
    NAME: 'user',
    ACTIONS: {},
    THUNK: {
      AUTHORIZATION: 'authorization',
    },
  },
} as const;

export const STORAGE_KEY = {} as const;

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

export const LibraryType = {
  artist: 'artist',
  album: 'album',
  playlist: 'playlist',
  track: 'track',
} as const;

export const NavigationRoutes = {
  Home: 'Home',
  Details: 'Details',
  Favorites: 'Favorites',
  Settings: 'Settings',
  ComingSoon: 'ComingSoon',
} as const;

export const Sizes = {
  headerHeight: 50,
};

export const ErrorBoundaryErrors = {
  unexpected: 'Unexpected Error Occurred',
  noInternetConnection: 'No Internet Connection',
};
