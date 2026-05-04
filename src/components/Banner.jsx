import React from "react";
import { Box, Typography, Button } from "@mui/material";
import bannerImg from "../assets/banner-png.png";

const Banner = () => {
  const handlePlay = () => {
    document
      .getElementById("trivias-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "90vh",
        backgroundImage: `url('${bannerImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(60,40,10,0.82) 0%, rgba(20,13,3,0.90) 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: 4,
          p: { xs: 4, md: 7 },
          textAlign: "center",
          maxWidth: "650px",
          width: "90%",
        }}
      >
        {/* Línea decorativa dorada */}
        <Box
          sx={{
            width: 48,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
            mx: "auto",
            mb: 3,
          }}
        />

        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.9rem", md: "3rem" },
            fontFamily: "Playfair Display, Georgia, serif",
            fontWeight: 700,
            color: "#f5e6b8",
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
            mb: 2,
          }}
        >
          ¿Cuánto sabés de historia?
        </Typography>

        <Typography
          sx={{
            mb: 4,
            fontSize: "1rem",
            fontFamily: "Georgia, serif",
            lineHeight: 1.7,
            color: "rgba(245,230,184,0.75)",
          }}
        >
          Poné a prueba tus conocimientos con trivias interactivas sobre
          Argentina y el mundo.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={(handlePlay) =>
            window.scrollTo({ top: 800, behavior: "smooth" })
          }
          aria-label="Comenzar a jugar trivias de historia"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: "bold",
            fontFamily: "Georgia, serif",
            borderRadius: "30px",
            backgroundColor: "#d4af37",
            color: "#1a0f00",
            boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
            transition: "all 0.22s ease",
            "&:hover": {
              backgroundColor: "#c19b2e",
              boxShadow: "0 6px 28px rgba(212,175,55,0.55)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Jugar ahora
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
