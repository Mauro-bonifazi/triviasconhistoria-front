// FinalMessage.jsx - Versión Integrada
import React from "react";
import { motion } from "framer-motion";
import { Typography, Box, Paper } from "@mui/material";

// El objeto resultContent y la función getResultContent permanecen igual...
const resultContent = {
  perfect: {
    images: [
      "https://media1.tenor.com/m/Jd1zpmFhr04AAAAC/san-martin-general-san-martin.gif",
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1746566039/0003469125_10_fd7izf.jpg",
    ],
    message: "¡Excelente! Tu conocimiento es digno de un monumento.",
  },
  veryGood: {
    images: [
      "https://media1.tenor.com/m/0K_b4aofN8MAAAAC/thumbs-up-napoleon.gif",
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969165/guemes-mbien_e0u9n9.png",
    ],
    message:
      "¡Impresionante! Sabés más que la Billiken. Tu esfuerzo da sus frutos.",
  },
  good: {
    images: [
      "https://media1.tenor.com/m/TZ8ztWygFKQAAAAd/billiken.gif",
      "https://media.tenor.com/_BLtjwJgC0YAAAAj/peron-circulo.gif",
    ],
    message: "Vas bien, como Belgrano con la bandera. ¡Seguí así!",
  },
  low: {
    images: [
      "https://media1.tenor.com/m/rxvHL9J8t0oAAAAd/napoleon-bonaparte-singing.gif",
      "https://media1.tenor.com/m/dzLhVjemC3UAAAAd/pope-francis-pray.gif",
    ],
    message:
      "¡No te desanimes! Hasta San Martín tuvo que cruzar los Andes. Un repaso más y lo lográs.",
  },
  bad: {
    images: [
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969167/sarmiento-mal_ohsr0r.png",
    ],
    message:
      "¡Ay! Ni Sarmiento te aprueba este intento. ¡Vamos a repasar y la próxima sale mejor!",
  },
};

const getResultContent = (score, total) => {
  if (score === total) return resultContent.perfect;
  if (score >= 8) return resultContent.veryGood;
  if (score >= 5) return resultContent.good;
  if (score >= 1) return resultContent.low;
  return resultContent.bad;
};

const FinalMessage = ({ score, totalQuestions }) => {
  const { images, message } = getResultContent(score, totalQuestions);
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    // 2. Usamos 'Paper' como contenedor principal para darle jerarquía
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        mt: 4,
        textAlign: "center",
        border: "1px solid",
        borderColor: "primary.light",
      }}
    >
      {/* 3. Mostramos el puntaje de forma clara y con color condicional */}

      {/* 4. El mensaje de aliento ahora usa la tipografía y color del tema */}
      <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
        {message}
      </Typography>

      <Box
        component={motion.img}
        src={randomImage}
        alt="Resultado Aleatorio"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "90%",
          maxWidth: 300,
          borderRadius: (theme) => theme.shape.borderRadius, // 5. Usamos el radio de borde del tema
          mx: "auto",
          my: 3,
          border: "3px solid", // 6. Borde con el color de acento
          borderColor: "accent.main",
        }}
      />
    </Paper>
  );
};

export default FinalMessage;
