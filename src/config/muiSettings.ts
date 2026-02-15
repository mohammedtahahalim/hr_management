import { type PaletteOptions, type Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    first: Palette["primary"];
    second: Palette["primary"];
    third: Palette["primary"];
    fourth: Palette["primary"];
  }

  interface PaletteOptions {
    first?: PaletteOptions["primary"];
    second?: PaletteOptions["primary"];
    third?: PaletteOptions["primary"];
    fourth?: PaletteOptions["primary"];
  }
}

export const lightPalette: PaletteOptions = {
  primary: {
    main: "#347be3",
    contrastText: "#f4f5f7",
  },
  secondary: {
    main: "#5433cf",
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff",
    paper: "#f7f7f7",
  },
  divider: "#f0f2f5",
  first: {
    main: "#1bae41",
    light: "#defbe3",
  },
  second: {
    main: "#f7a854",
    light: "#fdefde",
  },
  third: {
    main: "#347be3",
    light: "#eff4fd",
  },
  fourth: {
    main: "#5433cf",
    light: "#f3effc",
  },
  info: {
    main: "#eff4fd",
  },
};

export const darkPalette: PaletteOptions = {
  primary: {
    main: "#4f8ff0",
    contrastText: "#000000",
  },
  secondary: {
    main: "#6c4dff",
    contrastText: "#000000",
  },
  background: {
    default: "#0f1115",
    paper: "#171a21",
  },
  divider: "#2a2f3a",
  first: {
    main: "#27c15a",
    light: "#12301d",
  },
  second: {
    main: "#ffb86b",
    light: "#2e2114",
  },
  third: {
    main: "#4f8ff0",
    light: "#142033",
  },
  fourth: {
    main: "#7a5cff",
    light: "#1d1633",
  },
  info: {
    main: "#142033",
  },
};

export const HRComponents: Theme["components"] = {};
