import { useEffect } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { Tuneify } from '@assets/images';
import GradientScreen from '@components/gradientScreen';
import Icon from '@components/icon';
import LoadingView from '@components/loadingView';
import { IconFamily, REQUEST_STATUS, STORAGE_KEY } from '@constants';
import { _post, _postAccount } from '@network/instanceMethods';
import { useAppDispatch, useAppSelector } from '@store';
import { authorizeUser, requestAccessTokenAndSave } from '@store/reducers/auth';
import { GlobalThemedStyles } from '@themes';
import { parseUrl } from '@utility/helpers';

import { displayName as appName } from '../../../app.json';
import ThemedStyles from './styles';

const Login = () => {
  const dispatch = useAppDispatch();

  const { loading, loadingProcessInfo } = useAppSelector(({ user }) => {
    const { error } = user;
    if (error) {
      const { code, message } = error;
      Toast.show({ text1: `Error ${code}`, text2: message, type: 'error' });
    }

    return user;
  });

  const globalStyles = GlobalThemedStyles();
  const styles = ThemedStyles();

  const handleDeepLink = async ({ url }: { url: string }) => {
    const {
      searchParams: { code },
    } = parseUrl<AuthCodeResponseUrlType>(url);

    dispatch(requestAccessTokenAndSave(code));
  };

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const _onPressSignIn = () => {
    dispatch(authorizeUser());
  };

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
          onPress={_onPressSignIn}
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
