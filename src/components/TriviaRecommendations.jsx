import React from "react";
import { Typography, Box } from "@mui/material";

function TriviaRecommendations() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        ¿Te gustó esta trivia? ¡Seguí aprendiendo para transformar el mundo!
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        📚 Leé, explorá y descubrí más sobre nuestra historia en{" "}
        <a
          href="https://elhistoriador.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          El Historiador
        </a>
        .
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        🎧 Escuchá grandes relatos históricos en{" "}
        <a
          href="https://open.spotify.com/show/4u1nTj7G2CaNT7pZCntXvr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Historia en Podcast
        </a>
        .
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        🏛️ Visitá museos virtuales, leé, jugá y nunca dejes de aprender.
      </Typography>

      <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
        "Aprender es el primer paso para transformar tú historia."
      </Typography>
    </Box>
  );
}

export default TriviaRecommendations;
