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
    main: "#2863c2",
    contrastText: "#f4f5f7",
  },
  secondary: {
    main: "#6192d4",
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff",
    paper: "#f3effc",
  },
  divider: "",
  info: {
    main: "#eff4fd",
  },
  error: {
    main: "#f3effc",
  },
  success: {
    main: "#b1fdbf",
  },
  warning: {
    main: "#fdefde",
  },
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
};

export const darkPalette: PaletteOptions = {
  primary: {
    main: "#7aa2e8",
    contrastText: "#0b0f19",
  },
  secondary: {
    main: "#9ab8ea",
    contrastText: "#0b0f19",
  },

  background: {
    default: "#0e1118",
    paper: "#161b26",
  },

  divider: "#2a3142",

  info: {
    main: "#1f2b45",
  },

  error: {
    main: "#3a1f2b",
  },

  success: {
    main: "#2d6a3a",
  },

  warning: {
    main: "#6a4a2d",
  },

  first: {
    main: "#6ddf8a",
    light: "#1f3a2a",
  },

  second: {
    main: "#ffb86b",
    light: "#3a2a1a",
  },

  third: {
    main: "#7aa2ff",
    light: "#1b2a44",
  },

  fourth: {
    main: "#a58bff",
    light: "#241a44",
  },
};

export const HRComponents: Theme["components"] = {};
