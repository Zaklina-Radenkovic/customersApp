import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./baseThemeOptions";
import { darkThemeOptions } from "./darkThemeOptions";
import { lightThemeOptions } from "./lightThemeOptions";

export const createTheme = (config) => {
  let theme = createMuiTheme(
    baseThemeOptions,
    config.mode === "dark" ? darkThemeOptions : lightThemeOptions,
    {
      direction: config.direction,
    }
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
