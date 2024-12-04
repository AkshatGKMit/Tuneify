import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isIos, STORAGE_KEY, STORE_CONSTANTS } from '@constants';
import ApiConstants from '@network/apiConstants';
import { appendSearchParams, generateRandomString } from '@utility/helpers';
import StorageManager from '@utility/storage';
import { _postAccount } from '@network/instanceMethods';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

const { NAME: name, THUNK: thunk } = STORE_CONSTANTS.USER;

const { ACCOUNT_BASE_URL, CLIENT_ID, data, endpoints } = ApiConstants;

const { redirectUrl, authResponseType, authorizationScope, grantType } = data.account;
const {
  requestAccessToken: requestAccessTokenEndpoint,
  requestAuthorization: requestAuthorizationEndpoint,
} = endpoints.account;

const initialState: AuthState = {
  loading: false,
  isAuthorize: false,
};

export const authorizeUser = createAsyncThunk(thunk.AUTHORIZATION, async () => {
  const searchParams: UserAuthorizationParams = {
    client_id: CLIENT_ID,
    redirect_uri: redirectUrl,
    response_type: authResponseType,
    scope: authorizationScope,
    state: generateRandomString(16),
  };

  const url = new URL(requestAuthorizationEndpoint, ACCOUNT_BASE_URL + 'hh');
  appendSearchParams<UserAuthorizationParams>(url, searchParams);

  const urlString = url.toString();
  const isUrlValid = !isIos || (await Linking.canOpenURL(urlString));
  if (!isIos || isUrlValid) {
    await Linking.openURL(urlString);
  } else {
    Toast.show({ text1: 'Invalid Auth Url', type: 'error' });
  }
});

export const requestAccessTokenViaCode = createAsyncThunk(
  thunk.REQUEST_ACCESS_TOKEN,
  async (code: string) => {
    const body: RequestAccessTokenBody = {
      grant_type: grantType.code,
      redirect_uri: redirectUrl,
      code,
    };

    const response = await _postAccount<AuthAccessTokenResponse, RequestAccessTokenBody>(
      requestAccessTokenEndpoint,
      body,
    );

    return response;
  },
);

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<AuthState>) => {
  addCase(authorizeUser.pending, (state) => {
    state.loading = true;
  });
  addCase(authorizeUser.rejected, (state, actions) => {
    state.error = actions.error;
    state.loading = false;
  });
  addCase(authorizeUser.fulfilled, (state) => {
    state.loading = false;
  });

  addCase(requestAccessTokenViaCode.pending, (state) => {
    state.loading = false;
  });
  addCase(requestAccessTokenViaCode.rejected, (state, actions) => {
    state.error = actions.error;
    state.loading = false;
  });
  addCase(requestAccessTokenViaCode.fulfilled, (state, actions) => {
    state.loading = false;

    const { access_token, refresh_token, token_type } = actions.payload.data;

    const accessToken = `${token_type} ${access_token}`;

    StorageManager.saveStoreValue(STORAGE_KEY.REFRESH_TOKEN, refresh_token);
    StorageManager.saveStoreValue(STORAGE_KEY.ACCESS_TOKEN, accessToken);

    state.isAuthorize = true;
  });
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: reducerBuilder,
});

const authReducer = authSlice.reducer;

export default authReducer;
