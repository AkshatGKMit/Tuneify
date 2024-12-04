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

const { redirectUrl, authResponseType, authorizationScope } = data.account;
const {
  requestAccessToken: requestAccessTokenEndpoint,
  requestAuthorization: requestAuthorizationEndpoint,
} = endpoints.account;

const initialState: AuthState = {
  loading: false,
};

export const authorizeUser = createAsyncThunk(thunk.AUTHORIZATION, async () => {
  const searchParams: UserAuthorizationParams = {
    client_id: CLIENT_ID,
    redirect_uri: redirectUrl,
    response_type: authResponseType,
    scope: authorizationScope,
    state: generateRandomString(16),
  };

  const url = new URL(requestAuthorizationEndpoint, ACCOUNT_BASE_URL);
  appendSearchParams<UserAuthorizationParams>(url, searchParams);

  const urlString = url.toString();
  const isUrlValid = !isIos || (await Linking.canOpenURL(urlString));

  if (!isIos || isUrlValid) {
    await Linking.openURL(urlString);
  } else {
    Toast.show({ text1: 'Invalid Auth Url', type: 'error' });
  }
});

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<AuthState>) => {
  addCase(authorizeUser.pending, (state) => {
    state.loading = true;
  });
  addCase(authorizeUser.fulfilled, () => {});
  addCase(authorizeUser.rejected, (state, actions) => {
    state.error = actions.error;
    state.loading = false;
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
