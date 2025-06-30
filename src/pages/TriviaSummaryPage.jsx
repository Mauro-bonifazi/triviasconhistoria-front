import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import {
  Typography,
  Box,
  Card,
  CircularProgress,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import TriviaRecommendations from "../components/TriviaRecommendations";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function TriviaSummary({ score, totalQuestions, breakdown, onHome }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const correctAnswers = score;
      const incorrectAnswers = totalQuestions - score;

      setChartData({
        labels: ["Correctas", "Incorrectas"],
        datasets: [
          {
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: [
              theme.palette.success.main,
              theme.palette.error.main,
            ],
            borderColor: [theme.palette.success.dark, theme.palette.error.dark],
            borderWidth: 3,
          },
        ],
      });

      setLoading(false);
    }, 800);
  }, [score, totalQuestions, theme]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
      py={4}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          📜 Resumen Final
        </Typography>
      </motion.div>

      <Card
        sx={{
          width: "100%",
          maxWidth: "600px",
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Tu Puntaje:
          <Box component="span" color="primary.main" fontWeight="bold" ml={1}>
            {score} / {totalQuestions}
          </Box>
        </Typography>

        <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress size={50} color="primary" />
          ) : (
            chartData && (
              <Box sx={{ maxWidth: 300 }}>
                <Doughnut data={chartData} />
              </Box>
            )
          )}
        </Box>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          fontStyle="italic"
        >
          Tenés una efectividad del{" "}
          <strong>{Math.round((score / totalQuestions) * 100)}%</strong>.
          <br />
          <strong>¡Gracias por jugar!</strong>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {breakdown && breakdown.length > 0 && (
          <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Detalle de preguntas:
            </Typography>
            {breakdown.map((item, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle2">
                  <strong>Pregunta:</strong> {item.question}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      item.yourAnswer === item.correctAnswer
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  <strong>Tu respuesta:</strong> {item.yourAnswer}
                </Typography>
                {item.yourAnswer !== item.correctAnswer && (
                  <Typography variant="body2" color="primary">
                    <strong>Correcta:</strong> {item.correctAnswer}
                  </Typography>
                )}
                {item.resource && (
                  <Typography variant="caption" color="text.secondary">
                    {item.resource}
                  </Typography>
                )}
                <Divider sx={{ mt: 1 }} />
              </Box>
            ))}
          </Box>
        )}

        <TriviaRecommendations />
      </Card>

      {/* Botón de volver */}
      <Box mt={4}>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              fontWeight: "bold",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={onHome}
          >
            Ver más trivias
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default TriviaSummary;
