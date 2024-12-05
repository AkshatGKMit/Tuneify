import { ReactNode } from 'react';

import { StorageKey } from '@utility/storage';
import ApiConstants from '@network/apiConstants';

declare global {
  interface ContextProviderProps {
    children?: ReactNode;
  }

  interface WindowDimensions {
    height: number;
    width: number;
  }

  interface TokenContextValues {
    accessToken: string;
    saveAccessToken: (token: string, expiresIn: number) => void;
    saveRefreshToken: (token: string) => void;
    loading: boolean;
    loadingProcessInfo: string;
    navigateToLogin: null | boolean;
    login: () => void;
    logout: () => void;
  }
}
