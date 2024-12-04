import { Linking } from 'react-native';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { isIos, STORAGE_KEY, STORE_CONSTANTS } from '@constants';
import ApiConstants from '@network/apiConstants';
import { _postAccount } from '@network/instanceMethods';
import { appendSearchParams, generateRandomString } from '@utility/helpers';
import StorageManager from '@utility/storage';

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

export const fetchTokenFromStorage = createAsyncThunk(thunk.FETCH_TOKEN_FROM_STORAGE, async () => {
  const refreshToken = await StorageManager.getStoreValue<string>(STORAGE_KEY.REFRESH_TOKEN);

  if (!refreshToken) throw new Error('');
});

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
    throw new Error('Unable to open auth url');
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

export const logout = createAsyncThunk(thunk.LOGOUT, async () => {
  await StorageManager.saveStoreValue(STORAGE_KEY.REFRESH_TOKEN, '');
  await StorageManager.saveStoreValue(STORAGE_KEY.ACCESS_TOKEN, '');
});

const extraReducerBuilder = ({ addCase }: ActionReducerMapBuilder<AuthState>) => {
  addCase(fetchTokenFromStorage.pending, (state) => {
    state.loading = true;
  });
  addCase(fetchTokenFromStorage.rejected, (state) => {
    state.loading = false;
  });
  addCase(fetchTokenFromStorage.fulfilled, (state) => {
    state.loading = false;
    state.isAuthorize = true;
  });

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
    state.loading = true;
  });
  addCase(requestAccessTokenViaCode.rejected, (state, actions) => {
    state.error = actions.error;
    state.loading = false;
  });
  addCase(requestAccessTokenViaCode.fulfilled, (state, actions) => {
    state.loading = false;
    state.isAuthorize = true;
  });

  addCase(logout.fulfilled, (state) => {
    state.isAuthorize = false;
  });
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: extraReducerBuilder,
});

const authReducer = authSlice.reducer;

export default authReducer;
