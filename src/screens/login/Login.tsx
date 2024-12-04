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
import { authorizeUser, requestAccessTokenViaCode } from '@store/reducers/auth';
import { GlobalThemedStyles } from '@themes';
import { parseUrl } from '@utility/helpers';

import { displayName as appName } from '../../../app.json';
import ThemedStyles from './styles';

const Login = () => {
  const { loading, error } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();

  const [loadingProcessInfo] = useState('');

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const handleDeepLink = ({ url }: { url: string }) => {
    const {
      searchParams: { code },
    } = parseUrl<AuthCodeResponseUrlType>(url);

    dispatch(requestAccessTokenViaCode(code));
  };

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  useEffect(() => {
    if (error) {
      const { code, message } = error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
    }
  }, [error]);

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
