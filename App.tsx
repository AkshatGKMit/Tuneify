import { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen } from '@screens/index';

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
    </>
  );
};

export default App;
