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
    default: "#0f1117",
    paper: "#171a23",
  },
  divider: "#2a2f3a",
  first: {
    main: "#6aa4ff",
    contrastText: "#0b1020",
    light: "#8bb9ff",
  },
  second: {
    main: "#8f7bff",
    contrastText: "#120c2a",
    light: "#b2a4ff",
  },
  third: {
    main: "#ffb66d",
    contrastText: "#2a1600",
    light: "#ffd2a0",
  },
  fourth: {
    main: "#45d36e",
    contrastText: "#062012",
    light: "#7af2a0",
  },
};

export const HRComponents: Theme["components"] = {};
