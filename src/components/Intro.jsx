import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Intro = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 6,
            fontFamily: "Merriweather, serif",
            color: "#5b4a2f",
          }}
        >
          ¿Qué es una trivia?
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Ajusta el tamaño en pantallas pequeñas
            textAlign: "justify",
            fontFamily: "Merriweather, serif",
            color: "#5b4a2f",
            mb: 4, // Espaciado entre párrafos
          }}
        >
          Trivia proviene del latín <i>trivialis</i>, aquello común, accesible a
          todos. Bajo la premisa de que{" "}
          <strong>nunca dejamos de aprender</strong>, nuestro objetivo es poner
          a prueba tus conocimientos a través del juego, invitándote a repasar
          los hechos más importantes de nuestra historia de forma lúdica, visual
          y entretenida.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Ajusta el tamaño en pantallas pequeñas
            textAlign: "justify",
            color: "#5b4a2f",
            fontFamily: "Merriweather, serif",
            mb: 4, // Espaciado entre párrafos
          }}
        >
          Porque conocer el pasado nos ayuda a entender el presente... y
          construir el futuro.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Ajusta el tamaño en pantallas pequeñas
            textAlign: "center",
            fontStyle: "italic",
            mt: 4,
            fontFamily: "Merriweather, serif",
            color: "#5b4a2f",
          }}
        >
          Nuestra tarea y mayor recompensa es lograr que más personas se
          interesen por la historia.
        </Typography>
      </Container>
    </Box>
  );
};

export default Intro;
