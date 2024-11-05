import { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  const { theme, isDark, switchTheme } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);

  return (
    <>
      <PlatformDependentStatusBar />
      <SafeAreaView style={[globalStyles.screen]}>
        <Text>Tuneify</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
