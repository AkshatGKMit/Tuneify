import { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { Tuneify } from '@assets/images';
import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';
import LoadingView from '@components/loadingView';
import TokenContext from '@config/TokenContext';
import { IconFamily, isIos } from '@constants';
import { _post, _postAccount } from '@network/instanceMethods';
import ApiConstants from '@network/apiConstants';
import { useAppDispatch, useAppSelector } from '@store';
import { authorizeUser } from '@store/reducers/auth';
import { GlobalThemedStyles } from '@themes';
import { parseUrl } from '@utility/helpers';

import { displayName as appName } from '../../../app.json';
import ThemedStyles from './styles';

const Login = () => {
  const loading = useAppSelector(({ user }) => user.loading);
  const dispatch = useAppDispatch();

  const { saveAccessToken, saveRefreshToken, login } = useContext(TokenContext);

  const [loadingProcessInfo, setLoadingProcessInfo] = useState('');

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const {
    data,
    endpoints: { account: accountEndpoints },
  } = ApiConstants;

  const getAccessToken = async (code: string) => {
    setLoadingProcessInfo('Fetching Token');
    const { requestAccessToken: requestAccessTokenEndpoint } = accountEndpoints;

    const {
      grantType: { code: codeGrantType },
      redirectUrl,
    } = data.account;

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
      const { message } = response.error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
      return;
    }

    const { access_token, expires_in, refresh_token, token_type } = response.responseData;
    saveAccessToken(`${token_type} ${access_token}`, expires_in);
    saveRefreshToken(refresh_token);

    login();
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

        <TouchableOpacity
          style={[globalStyles.rowCenter, styles.signInButton]}
          onPress={() => dispatch(authorizeUser())}
          activeOpacity={0.85}
        >
          <>
            <Icon
              family={IconFamily.MaterialCommunityIcons}
              name="spotify"
              style={styles.spotifyIcon}
            />
            <Text style={styles.buttonContent}>Sign In with Spotify</Text>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.emptyView} />

      {loading ? <LoadingView processInfo={loadingProcessInfo} /> : null}
    </GradientScreen>
  );
};

export default Login;
