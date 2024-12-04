import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import { ThemeColorModes, ThemeMode } from '@themes';

const { NAME: sliceName } = STORE_CONSTANTS.THEME;

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: ThemeColorModes[ThemeMode.light],
  isDark: false,
};

const themeSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    switch: (state, actions: PayloadAction<ThemeModeType>) => {
      const { payload } = actions;

      state.mode = payload;
      state.colors = ThemeColorModes[payload];
      state.isDark = payload === ThemeMode.dark;
    },
  },
});

const themeReducer = themeSlice.reducer;

export const { switch: switchTheme } = themeSlice.actions;
export default themeReducer;
