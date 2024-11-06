import { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { LoginScreen } from '@screens';

import SettingsContext, { SettingsContextProvider } from '@config/SettingsContext';
import PlatformDependentStatusBar from '@config/platformDependentStatusBar';

import GlobalThemedStyles from '@themes/globalStyles';

const App = () => {
  return (
    <SettingsContextProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </SettingsContextProvider>
  );
};

const Main = () => {
  const { theme } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);

  return (
    <>
      <PlatformDependentStatusBar />
      <SafeAreaView style={[globalStyles.screen]}>
        <LoginScreen />
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default App;
