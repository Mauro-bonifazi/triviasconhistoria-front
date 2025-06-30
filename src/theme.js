// theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Declaramos la interfaz para que TypeScript reconozca los nuevos colores.
// Si no usas TypeScript, puedes eliminar las siguientes 7 líneas.
// declare module "@mui/material/styles" {
//   interface Palette {
//     accent: Palette["primary"];
//   }
//   interface PaletteOptions {
//     accent?: PaletteOptions["primary"];
//   }
// }

let theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#9ca77f", // Verde oliva
      contrastText: "#ffffff", // Texto blanco para mejor contraste sobre verde
    },
    secondary: {
      main: "#5b4a2f", // Marrón oscuro
      contrastText: "#ffffff",
    },
    text: {
      primary: "#5b4a2f", // Marrón oscuro para textos principales
      secondary: "#8a8d91", // Gris piedra
    }, // Color de acento para elementos importantes (CTA)
    accent: {
      main: "#c9a445", // Dorado/ocre
      contrastText: "#000000", // Texto negro sobre dorado
    }, // ¡NUEVO! Colores de estado para feedback al usuario
    success: {
      main: "#2e7d32", // Verde para aciertos
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f", // Rojo para errores
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1", // Azul para placeholders o información
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: `'Merriweather', serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
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
          padding: "10px 24px",
          transition: "transform 0.2s ease-in-out, background-color 0.2s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }, // ¡MEJORA! Definimos un estilo para el botón con color de acento
        containedAccent: {
          backgroundColor: "#c9a445",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#b8943a", // Un poco más oscuro en hover
          },
        },
      },
    }, // ¡NUEVO! Override para los campos de texto
    MuiTextField: {
      defaultProps: {
        // Usamos el color secundario por defecto para los inputs
        color: "secondary",
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#b6ba9c",
          borderBottomWidth: "2.5px",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
