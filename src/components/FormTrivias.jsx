import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import { createTrivia, updateQuestion } from "../api/triviaApi";
import ImageUpload from "./ImageUpload";

const FormTrivias = ({
  fetchData,
  setSnackbarSeverity,
  setSnackbarMessage,
  setOpenSnackbar,
  open,
  handleClose,
  setOpen,
  trivia,
}) => {
  const [message, setMessage] = useState(null);

  const [triviaData, setTriviaData] = useState({
    title: "",
    description: "",
    introduction: "",
    image: "",
    questions: [
      {
        question: "",
        options: ["", "", ""],
        answer: "",
        category: "",
        image: "",
      },
    ],
  });
  useEffect(() => {
    if (trivia) {
      setTriviaData(trivia);
    }
  }, [trivia, open]);

  // Manejo de cambios en campos generales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTriviaData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo de cambios en una pregunta específica
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...triviaData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setTriviaData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Manejo de cambios en una opción específica de una pregunta
  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...triviaData.questions];
    const updatedOptions = [...updatedQuestions[qIndex].options];
    updatedOptions[optionIndex] = value;
    updatedQuestions[qIndex] = {
      ...updatedQuestions[qIndex],
      options: updatedOptions,
    };
    setTriviaData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Agregar una nueva pregunta
  const addQuestion = () => {
    setTriviaData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          options: ["", "", ""],
          answer: "",
          category: "",
          image: "",
        },
      ],
    }));
  };

  // Eliminar una pregunta (si fuera necesario)
  const removeQuestion = (index) => {
    setTriviaData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trivia._id !== undefined) {
      updateQuestion(trivia._id, triviaData);

      setSnackbarMessage("Trivia editada exitosamente ✅");
      setSnackbarSeverity("success");
      handleClose();
      fetchData();
      return;
    }
    try {
      await createTrivia(triviaData);

      setSnackbarMessage("Trivia creada exitosamente ✅");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Resetear el formulario
      setTriviaData({
        title: "",
        description: "",
        introduction: "",
        image: "",
        questions: [
          {
            question: "",
            options: ["", "", ""],
            answer: "",
            category: "",
            image: "",
          },
        ],
      });

      setTimeout(() => {
        setOpen(false);
        setMessage(null);
        if (typeof fetchData === "function") fetchData();
      }, 1500);
    } catch (error) {
      setSnackbarMessage("Error al crear la trivia ❌");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {triviaData._id ? "Editar Trivia" : "Crear Trivia 🎉"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Completa los siguientes campos para crear la trivia:
            </DialogContentText>

            {message && <Alert severity={message.type}>{message.text}</Alert>}

            <TextField
              margin="dense"
              label="Título"
              fullWidth
              name="title"
              value={triviaData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Descripción"
              fullWidth
              name="description"
              value={triviaData.description}
              onChange={handleChange}
              required
              multiline
              rows={4} // Podés ajustar la cantidad de filas que ves
            />

            <TextField
              margin="dense"
              label="Reseña Histórica"
              fullWidth
              name="introduction"
              value={triviaData.introduction}
              onChange={handleChange}
              required
              multiline
              rows={6} // Podés poner más filas acá si querés, ya que puede ser un texto más largo
            />

            <ImageUpload
              onUpload={(url) =>
                setTriviaData((prev) => ({ ...prev, image: url }))
              }
            />

            <Box sx={{ mt: 2 }}>
              <h3>Preguntas</h3>
              {triviaData.questions.map((q, index) => (
                <Box key={index} sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
                  <TextField
                    margin="dense"
                    label={`Pregunta #${index + 1}`}
                    fullWidth
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                    required
                  />
                  <ImageUpload
                    onUpload={(url) =>
                      handleQuestionChange(index, "image", url)
                    }
                  />
                  {q.image && (
                    <img
                      src={q.image}
                      alt={`Pregunta ${index + 1}`}
                      width="100"
                      style={{ marginTop: 10 }}
                    />
                  )}

                  {q.options.map((option, oIndex) => (
                    <TextField
                      key={oIndex}
                      margin="dense"
                      label={`Opción ${oIndex + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, oIndex, e.target.value)
                      }
                      required
                    />
                  ))}
                  <TextField
                    margin="dense"
                    label="Respuesta Correcta"
                    fullWidth
                    value={q.answer}
                    onChange={(e) =>
                      handleQuestionChange(index, "answer", e.target.value)
                    }
                    required
                  />
                  <TextField
                    margin="dense"
                    label="Categoría"
                    fullWidth
                    value={q.category}
                    onChange={(e) =>
                      handleQuestionChange(index, "category", e.target.value)
                    }
                  />
                  {/* Puedes agregar un botón para eliminar esta pregunta si lo deseas */}
                  {triviaData.questions.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeQuestion(index)}
                      sx={{ mt: 1 }}
                    >
                      Eliminar Pregunta
                    </Button>
                  )}
                </Box>
              ))}
              <Button variant="contained" onClick={addQuestion}>
                Agregar Pregunta
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {triviaData._id ? "Editar" : "Crear Trivia"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default FormTrivias;
