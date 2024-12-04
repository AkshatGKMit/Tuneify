interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

interface AuthState {
  loading: boolean;
  isAuthorize: boolean;
  error?: Partial<ApiCallError>;
}
