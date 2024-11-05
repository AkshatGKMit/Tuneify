import { API_ACCOUNT_BASE_URL, API_BASE_URL, API_CLIENT_ID, API_CLIENT_SECRET } from '@env';

const ApiConstants = {
  CLIENT_ID: API_CLIENT_ID,
  CLIENT_SECRET: API_CLIENT_SECRET,
  BASE_URL: API_BASE_URL,
  ACCOUNT_BASE_URL: API_ACCOUNT_BASE_URL,
  contentType: {
    form: 'application/x-www-form-urlencoded',
    json: 'application/json',
  } as const,
  endpoints: {},
};

export default ApiConstants;
