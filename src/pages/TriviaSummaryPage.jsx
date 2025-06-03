import React, { useState, useEffect } from "react";
import TriviaRecommendations from "../components/TriviaRecommendations.jsx";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import {
  Button,
  Typography,
  Box,
  Card,
  CircularProgress,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { TwentyFourMpOutlined } from "@mui/icons-material";

// Registrar elementos para Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

function TriviaSummary({
  score,
  totalQuestions,
  timeTaken,
  breakdown,
  onRestart,
  onHome,
}) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true); // Control de carga

  useEffect(() => {
    // Simulación de espera para mostrar la animación de carga
    setTimeout(() => {
      const correctAnswers = score;
      const incorrectAnswers = totalQuestions - score;

      setChartData({
        labels: ["Correctas", "Incorrectas"],
        datasets: [
          {
            data: [correctAnswers, incorrectAnswers],
            backgroundColor: ["#4CAF50", "#FF3D00"], // Verde y rojo vibrante
            borderColor: ["#2E7D32", "#D32F2F"],
            borderWidth: 3,
          },
        ],
      });

      setLoading(false); // Fin de la carga
    }, 1000);
  }, [score, totalQuestions]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          🎉 ¡Resumen de Trivia! 🎉
        </Typography>
      </motion.div>

      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Puntaje:{" "}
          <span
            style={{ fontSize: "22px", fontWeight: "bold", color: "#1976D2" }}
          >
            {score} / {totalQuestions}
          </span>
        </Typography>

        {/* Mostrar tiempo total si se tiene el dato */}
        {timeTaken && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Tiempo total: {timeTaken} minutos
          </Typography>
        )}

        {/* Gráfico de resultados */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress size={50} color="primary" />
            </Box>
          ) : (
            chartData && (
              <Box sx={{ maxWidth: 300, mx: "auto" }}>
                <Doughnut data={chartData} />
              </Box>
            )
          )}
        </motion.div>
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "text.secondary", fontStyle: "italic" }}
        >
          Tenés una efectividad del{" "}
          <strong>{Math.round((score / totalQuestions) * 100)}%</strong>
          <br></br>
          <strong>Gracias por jugar! Te esperamos pronto.</strong>
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Desglose de preguntas */}
        {breakdown && breakdown.length > 0 && (
          <Box
            textAlign="left"
            sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Detalle de preguntas:
            </Typography>
            {breakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>Pregunta:</strong> {item.question}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    item.yourAnswer === item.correctAnswer ? "green" : "red"
                  }
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
                <Divider sx={{ my: 0.5 }} />
              </Box>
            ))}
          </Box>
        )}

        {/* Sección de recomendaciones generales */}
        <TriviaRecommendations />
      </Card>

      {/* Botones de acción */}
      <Box display="flex" gap={2} mt={3}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="black"
            sx={{
              marginTop: 2,
              maxWidth: "400px",
              alignSelf: "center",
              padding: "12px",
              fontSize: "12px",
              borderRadius: "20px",
              backgroundColor: "#64b5f6",
              color: "white", // Color
            }}
            onClick={onHome}
          >
            ver más trivias
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default TriviaSummary;
