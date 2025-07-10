import React from "react";
import { Typography, Box, Paper, Divider, Stack, Link } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import MuseumIcon from "@mui/icons-material/Museum";

function TriviaRecommendations() {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3 }, // Padding responsivo
        my: 4,
        border: "1px solid",
        borderColor: "primary.main", // Borde con el color primario del tema
        backgroundColor: "background.default",
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        color="secondary.main" // Usamos el marrón oscuro del tema
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        Expandí tus Horizontes
      </Typography>

      <Divider />

      {/* 3. 'Stack' para organizar las recomendaciones verticalmente con espaciado */}
      <Stack spacing={2.5} sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* 4. Íconos para dar un golpe visual, usando el color de acento (dorado) */}
          <MenuBookIcon sx={{ color: "accent.main", mr: 1.5 }} />
          <Typography variant="body1" color="text.primary">
            {/* 5. Uso el componente 'Link' de MUI para coherencia */}
            Leé más sobre nuestra historia en{" "}
            <Link
              href="https://elhistoriador.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary.main"
              underline="hover"
            >
              El Historiador
            </Link>
            .
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PodcastsIcon sx={{ color: "accent.main", mr: 1.5 }} />
          <Typography variant="body1" color="text.primary">
            Escuchá grandes relatos en{" "}
            <Link
              href="https://open.spotify.com/show/4u1nTj7G2CaNT7pZCntXvr"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary.main"
              underline="hover"
            >
              Historia en Podcast
            </Link>
            .
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MuseumIcon sx={{ color: "accent.main", mr: 1.5 }} />
          <Typography variant="body1" color="text.primary">
            Visitá museos, leé, jugá y nunca dejes de aprender.
          </Typography>
        </Box>
      </Stack>

      {/* 6. La cita final, estilizada y centrada para darle más peso */}
      <Typography
        variant="body2"
        sx={{
          fontStyle: "italic",
          mt: 4,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        "Aprender es el primer paso para transformar tu historia."
      </Typography>
    </Paper>
  );
}

export default TriviaRecommendations;
