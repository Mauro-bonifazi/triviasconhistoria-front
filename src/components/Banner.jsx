import React from "react";
import { Box, Typography } from "@mui/material";
import bannerImg from "../assets/banner-png.png";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw", // Ocupa todo el ancho de la ventana
        height: "80vh",
        backgroundImage: `url('${bannerImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: { xs: 3, md: 10 }, //
        margin: 0,
      }}
    >
      {/* Título centrado */}
      <Typography
        variant="h1"
        component="h1"
        color="black"
        sx={{
          color: "#000",
          fontFamily: "Playfair Display, serif",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "1px 1px 3px rgba(255, 255, 255, 0.3)", // jora la legibilidad sobre fondos antiguos
          mb: 2,
        }}
      >
        Trivias con Historia
      </Typography>

      {/* Frase histórica a la derecha */}
      <Typography
        variant="h5"
        component="blockquote"
        fontFamily="cinzel"
        sx={{
          textAlign: "right",
          fontStyle: "italic",
          maxWidth: "600px",
          alignSelf: "flex-end",
          textShadow: "1px 1px 6px rgba(0,0,0,0.7)",

          color: "#fff",
          fontFamily: "Playfair Display, serif",
        }}
      >
        "No renegués la historia de tu patria. No renegués la historia de tu
        familia, no niegues a tus abuelos. Buscá las raíces, buscá la historia.
        Y desde allí construí el futuro"
        <br></br>
        Papa Francisco.
      </Typography>
    </Box>
  );
};

export default Banner;
