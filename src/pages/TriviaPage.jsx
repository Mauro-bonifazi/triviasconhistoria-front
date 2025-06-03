import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByTitle } from "../api/triviaApi";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Container,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressIndicator from "../components/ProgressIndicator"; // Importa el componente de progreso
import TriviaSummary from "./TriviaSummaryPage"; // Importa el componente de resumen
import FinalScreen from "../components/FinalScreen";

function TriviaPage() {
  const { title } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [shownQuestions, setShownQuestions] = useState([]); // Preguntas mostradas
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [introduction, setIntroduction] = useState("");
  const [triviaFinished, setTriviaFinished] = useState(false);

  // 1. Cargar las preguntas al iniciar
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByTitle(title);
        if (data && Array.isArray(data) && data.length > 0) {
          const trivia = data[0];
          setQuestions(trivia.questions);
          setIntroduction(trivia.introduction);
          setShownQuestions([trivia.questions[0]]); // Iniciar con la primera pregunta
        } else {
          setError("No se encontraron preguntas para esta trivia.");
        }
      } catch (err) {
        console.error("Error al obtener las preguntas:", err);
        setError("No se pudieron cargar las preguntas.");
      }
    };

    fetchQuestions();
  }, [title]);
  // 2. Hacer scroll automático a la nueva pregunta
  useEffect(() => {
    if (shownQuestions.length > 0) {
      const lastQuestionIndex = shownQuestions.length - 1;
      const lastQuestionElement = document.getElementById(
        `question-${lastQuestionIndex}`
      );

      if (lastQuestionElement) {
        lastQuestionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [shownQuestions]);

  const handleAnswer = (option, questionIndex) => {
    if (feedback[questionIndex]) return; // Evita cambiar la respuesta

    const currentQuestion = questions[questionIndex];
    const isCorrect = option === currentQuestion.answer;

    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: {
        selected: option,
        isCorrect: isCorrect,
        showCorrect: false,
      }, // showCorrect aparece después
    }));

    if (!isCorrect) {
      // Si es incorrecta, esperamos 1 segundo antes de mostrar la correcta
      setTimeout(() => {
        setFeedback((prev) => ({
          ...prev,
          [questionIndex]: { ...prev[questionIndex], showCorrect: true },
        }));
      }, 1000);
    }

    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShownQuestions((prev) => [...prev, questions[currentIndex + 1]]); // Agregar nueva pregunta debajo
    } else {
      setTriviaFinished(true); // Marcar trivia como finalizada
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <Container>
      <h1>{title}</h1>
      <h2>
        "¿Estás listo para poner a prueba tus conocimientos sobre {title}?
        ¡Juega y demuestra todo lo que sabes!"
      </h2>
      <br />
      <Typography variant="h5">Reseña Histórica:</Typography>

      <Typography
        variant="body1"
        sx={{ marginBottom: 2, lineHeight: 1.8 }}
        paragraph
      >
        {introduction || "No hay introducción disponible."}
      </Typography>

      <br />
      <br />

      {/* Contenedor en columna con espacio entre preguntas */}
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6"></Typography>
        {shownQuestions.map((question, index) => (
          <Card
            id={`question-${index}`} // Agregamos un ID único
            sx={{
              width: "100%", // Ocupa todo el ancho disponible
              maxWidth: "500px", // Tamaño máximo
              minHeight: "300px", // Todas las cards tendrán la misma altura
              margin: "auto",
              padding: "15px",
              boxShadow: 3,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#f9f9f9", // Color de fondo claro
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {index + 1} / {questions.length}
              </Typography>

              <ProgressIndicator
                progress={
                  (Object.keys(feedback).length / questions.length) * 100
                }
              />

              <Typography variant="h6">
                {score} {score === 1 ? "Acierto" : "Aciertos"}
              </Typography>
            </Box>
            <Divider sx={{ marginY: 2, borderColor: "gray" }} />{" "}
            {/* Separador entre el encabezado y la pregunta */}
            <Typography
              variant="h4"
              sx={{
                marginTop: 2,
                textAlign: "center", // Centra el texto
                display: "flex",
                justifyContent: "center", // Asegura que si hay varias líneas, se mantenga centrado
                alignItems: "center",
              }}
            >
              {question.question}
            </Typography>
            <br />
            <CardMedia
              component="img"
              height="300"
              image={
                question.image ||
                "data:image/png;base64,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"
              }
              alt={question.question}
              sx={{
                objectFit: "contain",
                width: "100%",
                height: "350px",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {question.options.map((option, i) => {
                const isCorrect = option === question.answer; // Identifica la respuesta correcta
                const isSelected = feedback[index]?.selected === option; // Opción elegida
                const wasWrong = isSelected && !feedback[index]?.isCorrect; // Si eligió mal
                const showCorrect =
                  feedback[index]?.showCorrect || feedback[index]?.isCorrect; // Se muestra si es correcta desde el inicio

                return (
                  <Button
                    key={i}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop: 1,
                      padding: "12px",
                      fontSize: "15px",
                      height: "auto", // ✅ Cambio importante
                      whiteSpace: "normal", // ✅ Para que el texto se acomode en varias líneas
                      wordBreak: "break-word", // ✅ Evita que las palabras largas se salgan
                      textAlign: "left", // ✅ Mejor presentación

                      backgroundColor:
                        feedback[index] && isSelected
                          ? wasWrong
                            ? "red"
                            : "green"
                          : showCorrect && isCorrect
                          ? "green"
                          : "white",
                      color: "black",

                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      "&:hover": {
                        backgroundColor: feedback[index] ? "" : "#64b5f6",
                        color: feedback[index] ? "" : "white",
                      },
                    }}
                    onClick={() => handleAnswer(option, index)}
                    disabled={feedback[index] !== undefined}
                  >
                    {option}
                    {feedback[index] && (
                      <>
                        {wasWrong && (
                          <Cancel style={{ color: "white", marginLeft: 8 }} />
                        )}
                        {showCorrect && isCorrect && (
                          <CheckCircle
                            style={{ color: "white", marginLeft: 8 }}
                          />
                        )}
                      </>
                    )}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        ))}
        {/* Botón "Siguiente pregunta" si aún hay preguntas */}
        {!triviaFinished && (
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
            onClick={handleNextQuestion}
            disabled={!feedback[currentIndex]} // Deshabilita el botón si no se respondió la pregunta
          >
            {currentIndex < questions.length - 1
              ? "Siguiente pregunta"
              : "Finalizar Trivia"}
          </Button>
        )}
        {/* Mensaje final con botón de resultados */}
        {triviaFinished && (
          <FinalScreen
            score={score}
            totalQuestions={questions.length}
          ></FinalScreen>
        )}
      </Grid>
    </Container>
  );
}

export default TriviaPage;
