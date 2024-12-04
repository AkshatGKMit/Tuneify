import { useContext, useEffect } from 'react';
import { Linking, LogBox, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SettingsContext, { SettingsContextProvider } from '@config/SettingsContext';
import { TokenContextProvider } from '@config/TokenContext';
import PlatformDependentStatusBar from '@config/platformDependentStatusBar';
import { GlobalThemedStyles } from '@themes';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Navigator from '@navigation/Navigator';
import CustomToast from '@config/customToast';
import { parseUrl } from '@utility/helpers';
import ErrorBoundary from '@config/ErrorBoundary';
import { useNetInfo } from '@react-native-community/netinfo';
import { ErrorBoundaryErrors } from '@constants';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SettingsContextProvider>
      <ErrorBoundary>
        <SafeAreaProvider>
          <TokenContextProvider>
            <Main />
          </TokenContextProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </SettingsContextProvider>
  );
};

const Main = () => {
  const netInfo = useNetInfo();

  const { theme } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['tuneify://'],
    config: {
      screens: {
        Details: {
          path: 'Details',
        },
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (url != null) {
        return url;
      }
    },
  };

  useEffect(() => {
    const { isConnected } = netInfo;
    if (isConnected !== null) {
      if (!isConnected) throw new Error(ErrorBoundaryErrors.noInternetConnection);
    }
  }, [netInfo]);

  return (
    <>
      <PlatformDependentStatusBar />
      <SafeAreaView style={globalStyles.screen}>
        <NavigationContainer linking={linking}>
          <Navigator />
        </NavigationContainer>
      </SafeAreaView>
      <CustomToast />
    </>
  );
};

export default App;
