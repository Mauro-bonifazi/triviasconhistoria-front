import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#8a8d91",
    },
    secondary: {
      main: "#5b4a2f",
    },
    text: {
      primary: "#5b4a2f",
    },
  },
  typography: {
    fontFamily: `'Merriweather', serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
          color: "#000 !important", // texto negro
        },
        containedPrimary: {
          backgroundColor: "#9ca77f", // verde oliva
          color: "#000 !important",
          "&:hover": {
            backgroundColor: "#8a966f",
            color: "#000 !important",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#b6ba9c", // verde oliva claro para el divisor
          borderBottomWidth: "2.5px",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
