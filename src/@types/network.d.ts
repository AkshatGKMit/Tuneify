import { AxiosRequestConfig } from 'axios';

import ApiConstants from '@network/apiConstants';

declare global {
  type ContentType = (typeof ApiConstants.contentType)[keyof typeof ApiConstants.contentType];

  interface RequestHeaders extends AxiosRequestConfig {
    Authorization: string;
    'Content-Type'?: ContentType;
    [key: string]: any;
  }

  interface ApiCallError {
    code: number | string;
    message: string;
  }

  interface ApiCallConfig<Params = {}> {
    headers?: RequestHeaders;
    params?: Params;
  }

  interface ApiCallSuccess<T> {
    success: true;
    responseData: T;
  }

  interface ApiCallFailure {
    success: false;
    error: ApiCallError;
  }

  type ApiCallResponse<T> = ApiCallSuccess<T> | ApiCallFailure;

  interface ApiError {
    code: number | string;
    message: string;
  }
}
