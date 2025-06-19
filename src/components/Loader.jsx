import React from "react";
import { Skeleton, Box, Stack } from "@mui/material";

function Loader({ height = 400 }) {
  return (
    <Box
      sx={{
        width: "100%", // 👈 Ocupa todo el ancho disponible
        maxWidth: 300, // 👈 Máximo 300px para desktop
        margin: "0 auto", // 👈 Centrado horizontal
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        bgcolor: "#fff",
      }}
    >
      <Stack spacing={1}>
        {/* Simulación de imagen */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height / 2}
          sx={{ borderRadius: 2 }}
        />

        {/* Simulación de título */}
        <Skeleton variant="text" height={30} />

        {/* Simulación de descripción */}
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" height={20} width="80%" />

        {/* Simulación de botón */}
        <Skeleton
          animation="pulse"
          height={30}
          width="40%"
          sx={{ borderRadius: 1 }}
        />
      </Stack>
    </Box>
  );
}

export default Loader;
