import React from "react";
import { motion } from "framer-motion";
import { Typography, Box } from "@mui/material";

const FinalMessage = ({ score, totalQuestions }) => {
  const perfectImages = [
    "https://media1.tenor.com/m/Jd1zpmFhr04AAAAC/san-martin-general-san-martin.gif",
    "https://media1.tenor.com/m/Al1t08bzL2IAAAAd/casero-alfredo-casero.gif",
    "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1746566039/0003469125_10_fd7izf.jpg",
  ];

  const veryGoodImages = [
    "https://media1.tenor.com/m/Jd1zpmFhr04AAAAC/san-martin-general-san-martin.gif",
    "https://media1.tenor.com/m/Al1t08bzL2IAAAAd/casero-alfredo-casero.gif",
    "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969165/guemes-mbien_e0u9n9.png",
  ];

  const goodImages = [
    "https://media1.tenor.com/m/Jd1zpmFhr04AAAAd/san-martin-general-san-martin.gif",
    "https://media1.tenor.com/m/TZ8ztWygFKQAAAAd/billiken.gif",
    "https://media.tenor.com/_BLtjwJgC0YAAAAj/peron-circulo.gif",
  ];

  const lowScoreImages = [
    "https://media1.tenor.com/m/0K_b4aofN8MAAAAC/thumbs-up-napoleon.gif",
    "https://media1.tenor.com/m/TZ8ztWygFKQAAAAd/billiken.gif",
    "https://media1.tenor.com/m/rxvHL9J8t0oAAAAd/napoleon-bonaparte-singing.gif",
  ];

  const badImages = [
    "https://res.cloudinary.com/dzhlkmrq0/image/upload/v1745969167/sarmiento-mal_ohsr0r.png",
    "https://media1.tenor.com/m/dzLhVjemC3UAAAAd/pope-francis-pray.gif",
    "https://media1.tenor.com/m/9KdFR2mtQd4AAAAd/ussr-communsim.gif",
  ];

  let imageArray = [];
  let message = "";

  if (score === totalQuestions) {
    imageArray = perfectImages;
    message =
      "¡Felicitaciones! Has respondido todo correctamente. Eres todo un prócer.";
  } else if (score >= 8) {
    imageArray = veryGoodImages;
    message =
      "¡Estuviste a un decreto de ser héroe nacional! Alta puntería histórica.";
  } else if (score >= 5) {
    imageArray = goodImages;
    message =
      "Vas por buen camino, como Belgrano con la bandera. ¡Un poco más y hacés historia!";
  } else if (score >= 1) {
    imageArray = lowScoreImages;
    message =
      "¡Casi que te mandamos al billete de 10! Seguí así, intentandolo!.";
  } else {
    imageArray = badImages;
    message =
      "¡Ay! Ni Sarmiento te aprueba este intento. A repasar, ciudadano.";
  }

  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

  return (
    <Box textAlign="center" mt={4}>
      {/* Imagen centralizada y responsive */}
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

      {/* Mensaje */}
      <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default FinalMessage;
