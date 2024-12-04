import { useEffect } from 'react';
import { Linking, LogBox, SafeAreaView, useColorScheme } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import ErrorBoundary from '@config/ErrorBoundary';
import CustomToast from '@config/customToast';
import { TokenContextProvider } from '@config/TokenContext';
import { ErrorBoundaryErrors } from '@constants';
import Navigator from '@navigation/Navigator';
import { GlobalThemedStyles, ThemeMode } from '@themes';
import store, { useAppDispatch, useAppSelector } from '@store';
import { switchTheme } from '@store/reducers/theme';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <TokenContextProvider>
            <Main />
          </TokenContextProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </Provider>
  );
};

const Main = () => {
  const netInfo = useNetInfo();
  const colorScheme = useColorScheme();

  const theme = useAppSelector(({ theme }) => theme.colors);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

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
