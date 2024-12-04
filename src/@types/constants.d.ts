import { REQUEST_STATUS, STORAGE_KEY } from '@constants';

declare global {
  type StorageKey = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];

  type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
}
