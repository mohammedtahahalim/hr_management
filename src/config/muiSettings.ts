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
    main: "#3f7ae0",
    contrastText: "#0e1117",
  },
  secondary: {
    main: "#7aa7e6",
    contrastText: "#0e1117",
  },
  background: {
    default: "#0f1724",
    paper: "#1a2233",
  },
  divider: "rgba(255,255,255,0.12)",
  info: {
    main: "#3f7ae0",
  },
  error: {
    main: "#e57373",
  },
  success: {
    main: "#4fdc72",
  },
  warning: {
    main: "#ffb86b",
  },
  first: {
    main: "#22c55e",
    light: "#143622",
  },
  second: {
    main: "#ffb86b",
    light: "#3a2a1a",
  },
  third: {
    main: "#4c8df0",
    light: "#14263f",
  },
  fourth: {
    main: "#6c4dff",
    light: "#1f1a3d",
  },
};

export const HRComponents: Theme["components"] = {};
