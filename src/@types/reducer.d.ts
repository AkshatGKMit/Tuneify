interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

interface AuthState {
  splashLoading: boolean;
  loading: boolean;
  loadingProcess: string;
  isAuthorize: boolean;
  error?: Partial<ApiCallError>;
}
