import { useEffect } from 'react';
import { Linking, LogBox, SafeAreaView, useColorScheme } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ErrorBoundary from '@config/ErrorBoundary';
import CustomToast from '@config/customToast';
import { ErrorBoundaryErrors } from '@constants';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { fetchTokenFromStorage } from '@store/reducers/auth';
import { GlobalThemedStyles, ThemeMode } from '@themes';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
};

const Main = () => {
  const netInfo = useNetInfo();
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const globalStyles = GlobalThemedStyles();

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

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  useEffect(() => {
    dispatch(fetchTokenFromStorage());
  }, []);

  return (
    <>
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
