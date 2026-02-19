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
    light: "#defbe3",
  },
};

export const darkPalette: PaletteOptions = {
  background: {
    default: "#0f1115",
    paper: "#161a22",
  },
  divider: "#2a2f3a",
  first: {
    main: "#5b8dff",
    light: "#82a7ff",
    contrastText: "#e9f0ff",
  },

  second: {
    main: "#8b6cff",
    light: "#a896ff",
    contrastText: "#f1ecff",
  },

  third: {
    main: "#f7b267",
    light: "#ffd2a1",
    contrastText: "#2b1a05",
  },

  fourth: {
    main: "#4fd37a",
    light: "#7ee3a0",
    contrastText: "#062012",
  },
};

export const HRComponents: Theme["components"] = {};
