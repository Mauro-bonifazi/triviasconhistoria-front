import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import RedSocial from "./RedSocial";
import logo from "../assets/logo-trivias.png";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#3a3a3a",
        textAlign: "center",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 2,
            display: "inline-block",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <img
            src={logo}
            alt="Logo del sitio Trivias con Historia"
            style={{ height: "70px", maxWidth: "100%" }}
            srcSet={`${logo} 1x, ${logo} 2x`}
          />
        </Box>

        <Box
          sx={{
            my: 2,
            "& svg": {
              transition: "color 0.3s ease",
              color: "#f2f2f2",
              "&:hover": {
                color: "#d9916c",
              },
              cursor: "pointer",
              fontSize: { xs: 28, sm: 32 },
              mx: 1.5,
            },
          }}
        >
          <RedSocial />
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontFamily: "'Merriweather', serif",
            color: "#f2f2f2",
          }}
        >
          Diseñado y desarrollado por{" "}
          <Link
            href="https://www.linkedin.com/in/maurobonifazi"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            @MauroBonifazi
          </Link>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontFamily: "'Merriweather', serif",
            color: "#f2f2f2",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://triviasconhistoria.com"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            triviasconhistoria.com
          </Link>{" "}
          — Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
