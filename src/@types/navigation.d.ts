import { LibraryType, NavigationRoutes } from '@constants';
import { NavigationProp, RouteProp } from '@react-navigation/native';

declare global {
  interface DetailsScreenParams {
    type: TrackOmittedLibrary;
    id: string;
  }

  type RootStackParamList = {
    Home: undefined;
    Details: DetailsScreenParams;
    Favorites: undefined;
    Settings: undefined;
    ComingSoon: undefined;
  };

  type HomeScreenParamList = NavigationProp<RootStackParamList, keyof typeof NavigationRoutes.Home>;
  type DetailsScreenParamList = NavigationProp<RootStackParamList, 'Details'>;
  type FavoritesScreenParamList = NavigationProp<
    RootStackParamList,
    keyof typeof NavigationRoutes.Favorites
  >;
  type SettingsScreenParamList = NavigationProp<
    RootStackParamList,
    keyof typeof NavigationRoutes.Settings
  >;

  type StackNavigation = CompositeNavigationProp<NativeStackNavigationProp<RootStackParamList>>;

  type DetailsScreenRoute = RouteProp<RootStackParamList, typeof NavigationRoutes.Details>;
}
