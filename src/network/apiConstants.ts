import { API_ACCOUNT_BASE_URL, API_BASE_URL, API_CLIENT_ID, API_CLIENT_SECRET } from '@env';

const ApiConstants = {
  CLIENT_ID: API_CLIENT_ID,
  CLIENT_SECRET: API_CLIENT_SECRET,
  BASE_URL: API_BASE_URL,
  ACCOUNT_BASE_URL: API_ACCOUNT_BASE_URL,
  tokenType: {
    bearer: 'Bearer',
    basic: 'Basic',
  },
  contentType: {
    form: 'application/x-www-form-urlencoded',
    json: 'application/json',
  } as const,
  accountData: {
    authorizationScope:
      'user-read-private user-read-recently-played user-top-read playlist-read-private user-library-read user-follow-read user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-follow-modify playlist-modify-public playlist-modify-private',
    redirectUrl: 'tuneify://login',
    authResponseType: 'code',
    grantType: 'authorization_code',
  },
  endpoints: {
    account: {
      requestAuthorization: 'authorize',
      requestAccessToken: 'api/token',
    },
  },
};

export default ApiConstants;
