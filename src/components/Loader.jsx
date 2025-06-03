import React from "react";
import { Skeleton, Box } from "@mui/material";
function Loader({ width = 300, height = 400 }) {
  return (
    <Box sx={{ width }}>
      {/* Simulación de imagen */}
      <Skeleton variant="rectangular" width="100%" height={height / 2} />

      {/* Simulación de título */}
      <Skeleton />

      {/* Simulación de descripción */}
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={20} width="80%" />

      {/* Último esqueleto sin animación */}
      <Skeleton animation={false} height={20} width="40%" />
    </Box>
  );
}

export default Loader;
