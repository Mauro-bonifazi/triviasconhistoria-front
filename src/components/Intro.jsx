import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";

const Intro = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      {" "}
      <Container maxWidth="md">
        {/* 1. Título Principal */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
          }}
        >
          Pon a Prueba tu Saber Histórico
        </Typography>
        <Divider sx={{ my: 4, mx: "auto", width: "100px" }} />{" "}
        {/* Un divisor sutil para separar */}
        {/* 2. Párrafo de Introducción y Misión */}
        <Typography
          variant="h5" // Usamos h5 para un texto con más jerarquía y tamaño
          component="p"
          sx={{
            textAlign: "center",
            color: "text.secondary", // Usamos el color secundario para un contraste suave
            mb: 4,
          }}
        >
          ¿Te animas a un desafío? Te invitamos a un viaje entretenido por los
          grandes momentos de la historia a través de trivias visuales, lúdicas
          y dinámicas.
        </Typography>
        {/* 3. El Origen y la Filosofía */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Pero, ¿sabes de dónde viene la idea de "trivia"? La palabra proviene
          del latín <i>trivialis</i>, aquello que es común y accesible para
          todos.
          <br />
          <b>Esa es exactamente nuestra filosofía.</b> Creemos que el
          conocimiento no tiene por qué ser complejo o aburrido.
        </Typography>
        {/* 4. Frase Final con Énfasis */}
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            fontStyle: "italic",
            color: "primary.main", // Usamos el color primario del tema para destacarlo
            mt: 4,
          }}
        >
          Porque conocer el pasado nos ayuda a entender el presente... y a
          construir el futuro.
        </Typography>
      </Container>
    </Box>
  );
};

export default Intro;
