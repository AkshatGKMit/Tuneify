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
    THUNK: {
      FETCH_TOKEN_FROM_STORAGE: 'fetchTokenFromStorage',
      AUTHORIZATION: 'authorization',
      REQUEST_ACCESS_TOKEN: 'request_access_token',
      LOGOUT: 'logout',
      SAVE_TOKEN_IN_STORAGE: 'save_token_in_storage',
    },
  },
} as const;

export const REQUEST_STATUS = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
} as const;

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

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
