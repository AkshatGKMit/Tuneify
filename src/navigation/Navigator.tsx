import Login from '@screens/login/Login';
import Splash from '@screens/splash/Splash';
import { useAppSelector } from '@store';

import StackNavigator from './StackNavigator';

const Navigator = () => {
  const { splashLoading, isAuthorize } = useAppSelector(({ user }) => user);

  if (splashLoading) {
    return <Splash />;
  }

  return !isAuthorize ? <Login /> : <StackNavigator />;
};

export default Navigator;
