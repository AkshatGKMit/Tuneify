import { createContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import ApiConstants from '@network/apiConstants';
import { _postAccount } from '@network/instanceMethods';
import StorageManager, { StorageKey } from '@utility/storage';

const defaultValue: TokenContextValues = {
  accessToken: '',
  saveAccessToken: () => {},
  saveRefreshToken: () => {},
  loading: true,
  loadingProcessInfo: '',
  navigateToLogin: null,
};

const TokenContext = createContext<TokenContextValues>(defaultValue);

export const TokenContextProvider = ({ children }: ContextProviderProps) => {
  const {
    accessToken: defaultAccessToken,
    loading: defaultLoading,
    loadingProcessInfo: defaultLoadingProcessInfo,
    navigateToLogin: defaultNavigateToLogin,
  } = defaultValue;

  const [accessToken, setAccessToken] = useState(defaultAccessToken);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [refreshToken, setRefreshToken] = useState('');
  const [navigateToLogin, setNavigatorToLogin] = useState(defaultNavigateToLogin);
  const [loading, setLoading] = useState(defaultLoading);
  const [loadingProcessInfo, setLoadingProcessInfo] = useState(defaultLoadingProcessInfo);

  //* Fetch new access token
  const getAccessToken = async (token: string) => {
    setLoading(true);
    setLoadingProcessInfo('Fetching Token');
    const {
      accountData: { grantType },
      endpoints: {
        account: { requestAccessToken },
      },
    } = ApiConstants;

    const url = requestAccessToken;
    const body: RequestAccessTokenBody = {
      grant_type: grantType.token,
      refresh_token: token,
    };

    const response = await _postAccount<AuthAccessTokenResponse, RequestAccessTokenBody>(url, body);

    if (!response.success) {
      setLoading(false);

      const { message } = response.error;
      Toast.show({ text1: message });

      return;
    }

    const { access_token, expires_in, token_type } = response.responseData;
    saveAccessToken(`${token_type} ${access_token}`, expires_in);

    setLoading(false);
  };

  //* Set token expiration in timer
  const updateTokenExpirationTimer = (expiresAt: string) => {
    const expirationTime = new Date(expiresAt).getTime();
    const remainingTime = Math.max(0, Math.floor((expirationTime - Date.now()) / 1000));
    setTimeLeft(remainingTime);
  };

  //* Load Stored Data from Storage
  const loadStore = async () => {
    setLoading(true);
    setLoadingProcessInfo('Fetching Data');
    const {
      accessToken: accessTokenKey,
      refreshToken: refreshTokenKey,
      tokenExpiresIn: tokenExpiresInKey,
    } = StorageKey;

    const storedRefreshToken = (await StorageManager.getStoreValue<string>(refreshTokenKey)) ?? '';
    setRefreshToken(storedRefreshToken);

    setNavigatorToLogin(!storedRefreshToken);
    if (!storedRefreshToken) return;

    const storedAccessToken = (await StorageManager.getStoreValue<string>(accessTokenKey)) ?? '';
    setAccessToken(storedAccessToken);

    const storedExpiresIn = (await StorageManager.getStoreValue<string>(tokenExpiresInKey)) ?? '';
    updateTokenExpirationTimer(storedExpiresIn);

    setLoading(false);
  };

  useEffect(() => {
    loadStore();
  }, []);

  useEffect(() => {
    if (refreshToken && timeLeft <= 0) {
      getAccessToken(refreshToken);
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, refreshToken]);

  //* Save data to Storage
  const saveAccessToken = async (token: string, expiresIn: number) => {
    setAccessToken(token);
    await StorageManager.saveStoreValue(StorageKey.accessToken, JSON.stringify(token));

    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresIn);
    updateTokenExpirationTimer(`${now}`);
    await StorageManager.saveStoreValue(StorageKey.tokenExpiresIn, JSON.stringify(now));
  };

  const saveRefreshToken = async (token: string) => {
    setRefreshToken(token);
    await StorageManager.saveStoreValue(StorageKey.refreshToken, JSON.stringify(token));
  };

  const contextValues: TokenContextValues = {
    accessToken,
    saveAccessToken,
    saveRefreshToken,
    loading,
    loadingProcessInfo,
    navigateToLogin,
  };

  return (
    <TokenContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default TokenContext;
