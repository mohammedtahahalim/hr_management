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
  background: {
    default: "#ffffff",
    paper: "#f3effc",
  },
  divider: "#e8ebef",
  first: {
    main: "#347be3",
    contrastText: "#eff4fd",
    light: "#6192d4",
  },
  second: {
    main: "#5433cf",
    contrastText: "#f3effc",
    light: "#decdf8",
  },
  third: {
    main: "#f7a854",
    contrastText: "#fdefde",
    light: "#f6d6b1",
  },
  fourth: {
    main: "#1bae41",
    contrastText: "#defbe3",
    light: "#b1fdbf",
  },
};

export const darkPalette: PaletteOptions = {
  background: {
    default: "#0f1115",
    paper: "#161a22",
  },
  divider: "#2a2f3a",
  first: {
    main: "#5b9cff",
    contrastText: "#0f1115",
    light: "#3f78cc",
  },
  second: {
    main: "#8b6bff",
    contrastText: "#0f1115",
    light: "#6a4fd1",
  },
  third: {
    main: "#ffb86b",
    contrastText: "#1a1a1a",
    light: "#cc8a45",
  },
  fourth: {
    main: "#3fd06a",
    contrastText: "#0f1115",
    light: "#2aa24f",
  },
};

export const HRComponents: Theme["components"] = {};
