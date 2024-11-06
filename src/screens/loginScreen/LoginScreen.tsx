import { useContext, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import { Buffer } from 'buffer';

import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';

import { Tuneify } from '@assets/images';

import SettingsContext from '@config/SettingsContext';

import { _post } from '@network/instanceMethods';

import {
  appendSearchParams,
  colorWithOpacity,
  generateRandomString,
  parseUrl,
} from '@utility/helpers';
import { displayName as appName } from '../../../app.json';
import ApiConstants from '@network/apiConstants';
import { IconFamily } from '@constants';

import GlobalThemedStyles from '@themes/globalStyles';
import ThemedStyles from './styles';
import { Colors } from '@themes';

export const LoginScreen = () => {
  const { theme, isDark, dimensions } = useContext(SettingsContext);

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme, dimensions);

  const {
    CLIENT_ID,
    CLIENT_SECRET,
    ACCOUNT_BASE_URL,
    tokenType,
    contentType,
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
    const { basic } = tokenType;
    const { form } = contentType;
    const { grantType, redirectUrl } = accountData;
    const { requestAccessToken: requestAccessTokenEndpoint } = accountEndpoints;

    const url = ACCOUNT_BASE_URL + requestAccessTokenEndpoint;

    const body: RequestAccessTokenBody = {
      code,
      grant_type: grantType,
      redirect_uri: redirectUrl,
    };

    const Authorization = `${basic} ${Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
      'base64',
    )}`;

    const config: ApiCallConfig = {
      headers: {
        Authorization,
        'Content-Type': form,
      },
    };

    const response = await _post<AuthAccessTokenResponse, RequestAccessTokenBody>(
      url,
      body,
      config,
    );

    if (!response.success) {
      const { message, code } = response.error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
      return;
    }
  };

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const {
        searchParams: { code },
      } = parseUrl<AuthCodeResponseUrlType>(url);

      getAccessToken(code);
    };

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
