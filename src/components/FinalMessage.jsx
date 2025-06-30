import React from "react";
import { motion } from "framer-motion";
import { Typography, Box } from "@mui/material";

const resultContent = {
  perfect: {
    images: [
      "https://media1.tenor.com/m/Jd1zpmFhr04AAAAC/san-martin-general-san-martin.gif",
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1746566039/0003469125_10_fd7izf.jpg",
    ],
    message:
      "¡Felicitaciones! Respondiste todo correctamente. Sos un verdadero prócer.",
  },
  veryGood: {
    images: [
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969165/guemes-mbien_e0u9n9.png",
    ],
    message:
      "¡Alta puntería histórica! Estás a un decreto de ser héroe nacional.",
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
      "https://media1.tenor.com/m/0K_b4aofN8MAAAAC/thumbs-up-napoleon.gif",
      "https://media1.tenor.com/m/rxvHL9J8t0oAAAAd/napoleon-bonaparte-singing.gif",
    ],
    message: "¡Casi te mandamos al billete de 10! ¡A seguir intentando!",
  },
  bad: {
    images: [
      "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969167/sarmiento-mal_ohsr0r.png",
      "https://media1.tenor.com/m/dzLhVjemC3UAAAAd/pope-francis-pray.gif",
      "https://media1.tenor.com/m/9KdFR2mtQd4AAAAd/ussr-communsim.gif",
    ],
    message: "¡Ay! Ni Sarmiento te aprueba este intento. A repasar, ciudadano.",
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
    <Box textAlign="center" mt={4}>
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
          borderRadius: 2,
          mx: "auto",
        }}
      />

      <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default FinalMessage;
