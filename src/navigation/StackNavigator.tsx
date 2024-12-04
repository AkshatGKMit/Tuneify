import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@screens/home/Home';
import Details from '@screens/details/Details';
import Favorites from '@screens/favorites/Favorites';
import Settings from '@screens/settings/Settings';
import { NavigationRoutes } from '@constants';
import CustomHeader from '@config/customHeader';
import HomeHeader from '@config/homeHeader';
import ComingSoon from '@screens/comingSoon/ComingSoon';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: 'fade' }}>
      <Stack.Screen
        name={NavigationRoutes.Home}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.Details}
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationRoutes.Favorites}
        component={Favorites}
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={NavigationRoutes.Favorites}
            />
          ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.Settings}
        component={Settings}
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={NavigationRoutes.Settings}
            />
          ),
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.ComingSoon}
        component={ComingSoon}
        options={{
          header: (props) => <CustomHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
