import Login from '@screens/login/Login';
import { useAppSelector } from '@store';

import StackNavigator from './StackNavigator';

const Navigator = () => {
  const { isAuthorize } = useAppSelector(({ user }) => user);

  return !isAuthorize ? <Login /> : <StackNavigator />;
};

export default Navigator;
