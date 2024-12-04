interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

interface AuthState {
  loading: boolean;
  error?: Partial<ApiCallError>;
}
