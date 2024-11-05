import { AxiosError } from 'axios';

export const ErrorHandler = (error: AxiosError): ApiError => {
  if (!error) {
    throw new Error('Unrecoverable error! Error is null or undefined.');
  }

  if (error.code === 'ERR_NETWORK') {
    return { code: 500, message: 'Connection Error' };
  } else if (error.code === 'ERR_CANCELED') {
    return { code: 511, message: 'Connection cancelled' };
  }

  if (error.response) {
    const { status: statusCode } = error.response;

    switch (statusCode) {
      case 401:
        return { code: 401, message: 'Token Expired, Please log in to access this resource' };
      case 403:
        return {
          code: 403,
          message: 'Access denied. You do not have permission to view this resource.',
        };
      case 404:
        return { code: 404, message: 'The requested resource does not exist or has been deleted' };
      case 429:
        return {
          code: 429,
          message: 'You have exceed your rate limits. Please try again after some time.',
        };
      case 500:
        return { code: 500, message: 'Internal Server Error. Please try again later.' };
      default:
        return { code: statusCode, message: 'An unexpected error occurred' };
    }
  } else if (error.request) {
    return { code: 'REQUEST_ERROR', message: 'No response received from the server' };
  } else {
    return { code: 'UNKNOWN_ERROR', message: error.message || 'An unknown error occurred' };
  }
};
