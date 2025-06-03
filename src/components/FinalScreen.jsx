import React, { useState } from "react";
import { Typography, Button, Container, Grid, Card } from "@mui/material";
import TriviaSummaryPage from "../pages/TriviaSummaryPage";
import ConfettiEffect from "../components/ConfettiEffect.jsx";
import FinalMessage from "./FinalMessage.jsx";

const FinalScreen = ({ score, totalQuestions, onRestart }) => {
  const [showSummary, setShowSummary] = useState(false);

  // Si se activa el resumen, se muestra la página de resumen.
  if (showSummary) {
    return (
      <TriviaSummaryPage
        score={score}
        totalQuestions={totalQuestions}
        onBack={() => setShowSummary(false)}
      />
    );
  }

  return (
    <Container style={{ textAlign: "center", padding: "20px" }}>
      {/* Mostrar confeti si el usuario obtuvo puntaje perfecto */}
      {score === totalQuestions && <ConfettiEffect active={true} />}
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "500px",
            minHeight: "300px",
            margin: "auto",
            padding: "15px",
            boxShadow: 3,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}></Typography>
          <Typography variant="h6">
            <span
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              {" "}
              {score}
            </span>{" "}
            <span style={{ fontSize: "20px", color: "#1976d2" }}>
              Aciertos de {totalQuestions}
            </span>{" "}
          </Typography>
          {/* Renderizamos el componente FinalMessage */}
          <FinalMessage score={score} totalQuestions={totalQuestions} />

          <Button
            variant="contained"
            color="black"
            sx={{
              marginTop: 2,
              maxWidth: "400px",
              alignSelf: "center",
              padding: "12px",
              fontSize: "12px",
              borderRadius: "20px",
              backgroundColor: "#64b5f6",
              color: "white", // Color de fondo azul
            }}
            onClick={() => setShowSummary(true)}
          >
            Ver estadísticas
          </Button>
        </Card>
      </Grid>
    </Container>
  );
};

export default FinalScreen;
