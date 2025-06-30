import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  Card,
  Box,
  useTheme,
} from "@mui/material";
import TriviaSummaryPage from "../pages/TriviaSummaryPage";
import ConfettiEffect from "../components/ConfettiEffect.jsx";
import FinalMessage from "./FinalMessage.jsx";

const FinalScreen = ({ score, totalQuestions, onRestart }) => {
  const [showSummary, setShowSummary] = useState(false);
  const theme = useTheme(); // Usamos theme para mantener coherencia

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
    <Container sx={{ py: 4 }}>
      {score === totalQuestions && <ConfettiEffect active={true} />}

      <Box display="flex" justifyContent="center">
        <Card
          sx={{
            width: "100%",
            maxWidth: "600px",
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            🎉 ¡Trivia Finalizada!
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Aciertos:
            <span
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: theme.palette.primary.main,
                marginLeft: 8,
              }}
            >
              {score} / {totalQuestions}
            </span>
          </Typography>

          <FinalMessage score={score} totalQuestions={totalQuestions} />

          <Button
            variant="contained"
            onClick={() => setShowSummary(true)}
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              borderRadius: 5,
              fontSize: "14px",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Ver estadísticas
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default FinalScreen;
