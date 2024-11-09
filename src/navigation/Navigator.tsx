import { useContext } from 'react';

import TokenContext from '@config/TokenContext';
import LoadingView from '@components/loadingView';
import Login from '@screens/login/Login';
import StackNavigator from './StackNavigator';

const Navigator = () => {
  const { loading, loadingProcessInfo, navigateToLogin, saveAccessToken } =
    useContext(TokenContext);

  if (loading) return <LoadingView processInfo={loadingProcessInfo} />;

  return navigateToLogin ? <Login /> : <StackNavigator />;
};

export default Navigator;
