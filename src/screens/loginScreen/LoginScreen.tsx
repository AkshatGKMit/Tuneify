import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';

import { Tuneify } from '@assets/images';

import SettingsContext from '@config/SettingsContext';

import { _post, _postAccount } from '@network/instanceMethods';
import ApiConstants from '@network/apiConstants';

import {
  appendSearchParams,
  colorWithOpacity,
  generateRandomString,
  parseUrl,
} from '@utility/helpers';
import { displayName as appName } from '../../../app.json';
import { IconFamily } from '@constants';

import GlobalThemedStyles from '@themes/globalStyles';
import { Colors } from '@themes';
import ThemedStyles from './styles';

import { useContext, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

export const LoginScreen = () => {
  const { theme, isDark, dimensions } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme, dimensions);

  const {
    CLIENT_ID,
    ACCOUNT_BASE_URL,
    accountData,
    endpoints: { account: accountEndpoints },
  } = ApiConstants;

  const getUserAuthorization = async () => {
    const { redirectUrl, authorizationScope, authResponseType } = accountData;
    const { requestAuthorization: requestAuthorizationEndpoint } = accountEndpoints;

    const state = generateRandomString(16);

    const searchParams: UserAuthorizationParams = {
      client_id: CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: authResponseType,
      scope: authorizationScope,
      state,
    };

    const url = new URL(requestAuthorizationEndpoint, ACCOUNT_BASE_URL);
    appendSearchParams<UserAuthorizationParams>(url, searchParams);

    const urlString = url.toString();
    const isUrlValid = await Linking.canOpenURL(urlString);

    if (isUrlValid) {
      await Linking.openURL(urlString);
    } else {
      Toast.show({ text1: 'Invalid Auth Url', type: 'error' });
    }
  };

  const getAccessToken = async (code: string) => {
    const { requestAccessToken: requestAccessTokenEndpoint } = accountEndpoints;

    const {
      grantType: { code: codeGrantType },
      redirectUrl,
    } = accountData;

    const body: RequestAccessTokenBody = {
      grant_type: codeGrantType,
      redirect_uri: redirectUrl,
      code,
    };

    const response = await _postAccount<AuthAccessTokenResponse, RequestAccessTokenBody>(
      requestAccessTokenEndpoint,
      body,
    );

    if (!response.success) {
      const { message, code } = response.error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
      return;
    }
  };

  const handleDeepLink = ({ url }: { url: string }) => {
    const {
      searchParams: { code },
    } = parseUrl<AuthCodeResponseUrlType>(url);

    getAccessToken(code);
  };

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const highlightUnderlayColor = colorWithOpacity(
    isDark ? Colors.primary.dark : Colors.primary.light,
    0.75,
  );

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

        <TouchableHighlight
          style={[globalStyles.rowCenter, styles.signInButton]}
          onPress={getUserAuthorization}
          underlayColor={highlightUnderlayColor}
        >
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

export default LoginScreen;
