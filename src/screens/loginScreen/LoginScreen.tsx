import { useContext } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';

import SettingsContext from '@config/SettingsContext';

import { Tuneify } from '@assets/images';

import { displayName as appName } from '../../../app.json';
import { IconFamily } from '@constants';

import GlobalThemedStyles from '@themes/globalStyles';
import ThemedStyles from './styles';

export const LoginScreen = () => {
  const { theme, dimensions } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme, dimensions);

  return (
    <GradientScreen>
      <View style={[globalStyles.columnCenter, styles.screen]}>
        <Image
          source={Tuneify}
          style={styles.appLogo}
        />
        <Text style={styles.appName}>{appName}</Text>
        <Text style={styles.description}>
          Unlock a treasure trove of sounds. Let your ears wander through musical landscapes!
        </Text>
        <TouchableHighlight style={[globalStyles.rowCenter, styles.signInButton]}>
          <>
            <Icon
              family={IconFamily.MaterialCommunityIcons}
              name="spotify"
              style={[styles.spotifyIcon]}
            />
            <Text style={styles.buttonContent}>Sign In with Spotify</Text>
          </>
        </TouchableHighlight>
      </View>
      <View style={styles.emptyView} />
    </GradientScreen>
  );
};
