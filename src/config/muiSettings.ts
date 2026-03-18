import { type PaletteOptions, type Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    first: Palette["primary"];
    second: Palette["primary"];
    third: Palette["primary"];
    fourth: Palette["primary"];
    icon: Palette["primary"];
    overviewOne: Palette["primary"];
    overviewTwo: Palette["primary"];
    overviewThree: Palette["primary"];
    overviewFour: Palette["primary"];
  }

  interface PaletteOptions {
    first?: PaletteOptions["primary"];
    second?: PaletteOptions["primary"];
    third?: PaletteOptions["primary"];
    fourth?: PaletteOptions["primary"];
    icon?: PaletteOptions["primary"];
    overviewOne?: PaletteOptions["primary"];
    overviewTwo?: PaletteOptions["primary"];
    overviewThree?: PaletteOptions["primary"];
    overviewFour?: PaletteOptions["primary"];
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
  icon: {
    main: "#afb4bc",
  },
  overviewOne: {
    main: "#defbe3",
  },
  overviewTwo: {
    main: "#eff4fd",
  },
  overviewThree: {
    main: "#f3effc",
  },
  overviewFour: {
    main: "#fdefde",
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
  icon: {
    main: "#42474f",
  },
  overviewOne: {
    main: "#1f3a2a",
  },
  overviewTwo: {
    main: "#1f2d3d",
  },
  overviewThree: {
    main: "#2a2438",
  },
  overviewFour: {
    main: "#3a2a1f",
  },
};

export const HRComponents: Theme["components"] = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      "html, body": {
        transition: "background-color 200ms ease, color 200ms ease",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      "#root": {
        transition: "background-color 200ms ease, color 200ms ease",
      },
    }),
  },
};
