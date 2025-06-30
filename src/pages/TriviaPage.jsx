import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../api/triviaApi";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Container,
  Box,
  Divider,
  useTheme, // ¡Importamos el hook para acceder al tema!
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressIndicator from "../components/ProgressIndicator";
import FinalScreen from "../components/FinalScreen";
import { Helmet } from "react-helmet-async";

function TriviaPage() {
  const { id } = useParams();
  const theme = useTheme();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState(""); // <-- 2. AÑADIMOS ESTADO PARA LA IMAGEN PRINCIPAL
  const [error, setError] = useState(null);
  const [shownQuestions, setShownQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [introduction, setIntroduction] = useState("");
  const [triviaFinished, setTriviaFinished] = useState(false);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const trivia = await getQuestionById(id);
        if (trivia && trivia.questions?.length > 0) {
          setQuestions(trivia.questions);
          setIntroduction(trivia.introduction);
          setTitle(trivia.title);
          setMainImage(trivia.mainImage || trivia.questions[0].image); // <-- 3. GUARDAMOS LA IMAGEN
          setShownQuestions([trivia.questions[0]]);
        } else {
          setError("No se encontraron preguntas para esta trivia.");
        }
      } catch (err) {
        console.error("Error al obtener la trivia:", err);
        setError("No se pudo cargar la trivia.");
      }
    };

    fetchTrivia();
  }, [id]);

  useEffect(() => {
    if (shownQuestions.length > 1) {
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
    if (feedback[questionIndex]) return;

    const currentQuestion = questions[questionIndex];
    const isCorrect = option === currentQuestion.answer;

    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: {
        selected: option,
        isCorrect: isCorrect,
        showCorrect: false,
      },
    }));

    if (!isCorrect) {
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
      setShownQuestions((prev) => [...prev, questions[currentIndex + 1]]);
    } else {
      setTriviaFinished(true);
    }
  };

  if (error) {
    return (
      <Typography color="error" textAlign="center" sx={{ p: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        flexDirection="column"
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
          Cargando Trivia...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <>
        <Helmet>
          {/* Título dinámico de la página */}
          <title>{`Trivia sobre ${title} | Trivias con Historia`}</title>

          {/* Descripción para buscadores */}
          <meta
            name="description"
            content={`Poné a prueba tus conocimientos sobre ${title}. ${introduction.substring(
              0,
              120
            )}... Jugá, aprendé y descubrí datos fascinantes con esta trivia histórica.`}
          />

          {/* Etiquetas Open Graph para redes sociales */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Trivia sobre ${title}`} />
          <meta
            property="og:description"
            content={`¿Cuánto sabés sobre ${title}? Descubrilo jugando esta trivia y compartí tu resultado.`}
          />
          <meta
            property="og:image"
            content="https://triviasconhistoria-front.vercel.app/images/banner-historia.png"
          />

          <meta
            property="og:url"
            content={`https://triviasconhistoria-front.vercel.app/trivia/${id}`}
          />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`Trivia sobre ${title}`} />
          <meta
            name="twitter:description"
            content={`Poné a prueba tus conocimientos sobre ${title}. Jugá, aprendé y compartí tu resultado.`}
          />
          <meta
            name="twitter:image"
            content={
              mainImage ||
              "https://triviasconhistoria-front.vercel.app/images/banner-historia.png"
            }
          />
        </Helmet>
      </>

      <Container sx={{ py: 4 }}>
        {/* SECCIÓN DE TÍTULO E INTRODUCCIÓN */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            ¿Estás listo para poner a prueba tus conocimientos? ¡Juega y
            demuestra todo lo que sabes!
          </Typography>
        </Box>

        <Box mb={6}>
          <Typography variant="h4" gutterBottom>
            Reseña Histórica:
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            {introduction || "No hay introducción disponible."}
          </Typography>
        </Box>

        {/* CONTENEDOR DE PREGUNTAS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {shownQuestions.map((question, index) => {
            const feedbackInfo = feedback[index];

            return (
              <Card
                key={index}
                id={`question-${index}`}
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  p: { xs: 2, md: 3 }, // Padding responsivo
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary" fontWeight="bold">
                    {index + 1} / {questions.length}
                  </Typography>
                  <ProgressIndicator
                    progress={
                      (Object.keys(feedback).length / questions.length) * 100
                    }
                  />
                  <Typography variant="h6" color="primary.main">
                    {score} {score === 1 ? "Acierto" : "Aciertos"}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} /> {/* Hereda el color del tema */}
                <Typography variant="h4" textAlign="center" my={3}>
                  {question.question}
                </Typography>
                <CardMedia
                  component="img"
                  image={
                    question.image ||
                    "https://via.placeholder.com/600x350.png?text=Sin+imagen"
                  }
                  alt={question.question}
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    maxHeight: "350px",
                    borderRadius: 1, // Bordes redondeados para la imagen
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    pt: 3,
                  }}
                >
                  {question.options.map((option, i) => {
                    const isCorrect = option === question.answer;
                    const isSelected = feedbackInfo?.selected === option;
                    const wasWrong = isSelected && !feedbackInfo?.isCorrect;
                    const showAsCorrect =
                      (feedbackInfo?.isCorrect && isSelected) ||
                      (feedbackInfo?.showCorrect && isCorrect);

                    const getButtonColor = () => {
                      if (feedbackInfo) {
                        if (showAsCorrect) return theme.palette.success.main;
                        if (wasWrong) return theme.palette.error.main;
                      }
                      return theme.palette.background.paper; // Color por defecto
                    };

                    const getTextColor = () => {
                      if (feedbackInfo && (showAsCorrect || wasWrong)) {
                        return theme.palette.common.white;
                      }
                      return theme.palette.text.primary;
                    };

                    return (
                      <Button
                        key={i}
                        variant="outlined"
                        fullWidth
                        onClick={() => handleAnswer(option, index)}
                        disabled={feedbackInfo !== undefined}
                        sx={{
                          p: "12px",
                          justifyContent: "space-between",
                          backgroundColor: getButtonColor(),
                          color: getTextColor(),
                          borderColor: theme.palette.divider,
                          "&:hover": {
                            backgroundColor: !feedbackInfo
                              ? theme.palette.primary.light
                              : getButtonColor(),
                            borderColor: !feedbackInfo
                              ? theme.palette.primary.main
                              : "transparent",
                            color: !feedbackInfo
                              ? theme.palette.primary.contrastText
                              : getTextColor(),
                          },
                        }}
                      >
                        {option}
                        {feedbackInfo && (
                          <>
                            {wasWrong && (
                              <Cancel sx={{ color: "inherit", ml: 1 }} />
                            )}
                            {showAsCorrect && (
                              <CheckCircle sx={{ color: "inherit", ml: 1 }} />
                            )}
                          </>
                        )}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}

          {/* BOTÓN DE SIGUIENTE PREGUNTA / FINALIZAR */}
          {!triviaFinished && (
            <Button
              variant="contained"
              color="info"
              onClick={handleNextQuestion}
              disabled={!feedback[currentIndex]}
              sx={{ mt: 2, p: "12px 24px", minWidth: "250px" }}
            >
              {currentIndex < questions.length - 1
                ? "Siguiente Pregunta"
                : "Finalizar Trivia"}
            </Button>
          )}

          {/* PANTALLA FINAL */}
          {triviaFinished && (
            <FinalScreen score={score} totalQuestions={questions.length} />
          )}
        </Box>
      </Container>
    </>
  );
}

export default TriviaPage;
