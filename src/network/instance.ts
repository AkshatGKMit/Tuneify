import axios, { AxiosError, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import ApiConstants from './apiConstants';
import { ErrorHandler } from './errorHandler';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  BASE_URL,
  ACCOUNT_BASE_URL,
  tokenType: { basic },
  contentType: { form },
} = ApiConstants;

const instance = axios.create({
  baseURL: BASE_URL,
});

export const accountInstance = axios.create({
  baseURL: ACCOUNT_BASE_URL,
  headers: {
    'Content-Type': form,
    Authorization: `${basic} ${Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')}`,
  },
});

function interceptorResponse<T>(
  response: AxiosResponse<ApiCallResponse<T>>,
): AxiosResponse<ApiCallResponse<T>> {
  if (!response.data) {
    throw new Error(response.statusText || 'Unknown error occurred');
  }

  const apiSuccess: ApiCallSuccess<T> = { success: true, responseData: response.data as T };
  return { ...response, data: apiSuccess };
}

function interceptorError(error: AxiosError): ApiCallFailure {
  const apiError = ErrorHandler(error);

  const apiFailure: ApiCallFailure = { success: false, error: apiError };
  return apiFailure;
}

instance.interceptors.response.use(interceptorResponse, interceptorError);
accountInstance.interceptors.response.use(interceptorResponse, interceptorError);

export default instance;
