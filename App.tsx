import { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import LoadingView from '@components/loadingView';
import SettingsContext, { SettingsContextProvider } from '@config/SettingsContext';
import TokenContext, { TokenContextProvider } from '@config/TokenContext';
import PlatformDependentStatusBar from '@config/platformDependentStatusBar';
import Login from '@screens/login/Login';
import { GlobalThemedStyles } from '@themes';

const App = () => {
  return (
    <SettingsContextProvider>
      <SafeAreaProvider>
        <TokenContextProvider>
          <Main />
        </TokenContextProvider>
      </SafeAreaProvider>
    </SettingsContextProvider>
  );
};

const Main = () => {
  const { theme } = useContext(SettingsContext);
  const { loading, loadingProcessInfo } = useContext(TokenContext);

  const globalStyles = GlobalThemedStyles(theme);

  return (
    <>
      <PlatformDependentStatusBar />
      <SafeAreaView style={[globalStyles.screen]}>
        <Login />
        {loading ? <LoadingView processInfo={loadingProcessInfo} /> : null}
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default App;
