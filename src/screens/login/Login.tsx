import { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableHighlight, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

import { Tuneify } from '@assets/images';
import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';
import LoadingView from '@components/loadingView';
import SettingsContext from '@config/SettingsContext';
import TokenContext from '@config/TokenContext';
import { IconFamily, isIos } from '@constants';
import { _post, _postAccount } from '@network/instanceMethods';
import ApiConstants from '@network/apiConstants';
import {
  appendSearchParams,
  colorWithOpacity,
  generateRandomString,
  parseUrl,
} from '@utility/helpers';
import { Colors, GlobalThemedStyles } from '@themes';
import { displayName as appName } from '../../../app.json';
import ThemedStyles from './styles';

const Login = () => {
  const { theme, isDark, dimensions } = useContext(SettingsContext);
  const { saveAccessToken, saveRefreshToken } = useContext(TokenContext);

  const [loading, setLoading] = useState(false);
  const [loadingProcessInfo, setLoadingProcessInfo] = useState('');

  const globalStyles = GlobalThemedStyles(theme);
  const styles = ThemedStyles(theme, dimensions);

  const {
    CLIENT_ID,
    ACCOUNT_BASE_URL,
    accountData,
    endpoints: { account: accountEndpoints },
  } = ApiConstants;

  const getUserAuthorization = async () => {
    setLoading(true);
    setLoadingProcessInfo('Authorizing User');
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

    if (!isIos || isUrlValid) {
      await Linking.openURL(urlString);
    } else {
      setLoading(false);
      Toast.show({ text1: 'Invalid Auth Url', type: 'error' });
    }
  };

  const getAccessToken = async (code: string) => {
    setLoadingProcessInfo('Fetching Token');
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
      setLoading(false);
      const { message } = response.error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
      return;
    }

    const { access_token, expires_in, refresh_token, token_type } = response.responseData;
    saveAccessToken(`${token_type} ${access_token}`, expires_in);
    saveRefreshToken(refresh_token);

    setLoading(false);
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
          underlayColor={highlightUnderlayColor}
          onPress={getUserAuthorization}
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

      {loading ? <LoadingView processInfo={loadingProcessInfo} /> : null}
    </GradientScreen>
  );
};

export default Login;
