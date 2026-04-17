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
  setOpenSnackbar = () => {}, // <--- Agregamos "= () => {}" aquí
  open,
  handleClose,
  setOpen,
  trivia,
}) => {
  const [triviaData, setTriviaData] = useState({
    title: "",
    slug: "",
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

  const isEdit = Boolean(trivia?._id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTriviaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...triviaData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setTriviaData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

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

  const removeQuestion = (index) => {
    setTriviaData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // ... (mismo código arriba hasta el handleSubmit)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateQuestion(trivia._id, triviaData);
        setSnackbarMessage("Trivia editada exitosamente ✅");
      } else {
        await createTrivia(triviaData);
        setSnackbarMessage("Trivia creada exitosamente ✅");
      }

      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      handleClose();
      fetchData();

      if (!isEdit) {
        setTriviaData({
          title: "",
          slug: "",
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
      }
    } catch (error) {
      console.error("DETALLE DEL ERROR:", error.response?.data);

      // Armamos un mensaje claro según lo que responda el backend
      const errorMsg =
        error.response?.data === "Forbidden"
          ? "No tienes permiso (Token inválido o expirado) 🔐"
          : "Error al guardar la trivia ❌";

      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");

      // Solo intentamos abrir el snackbar si la función existe
      if (typeof setOpenSnackbar === "function") {
        setOpenSnackbar(true);
      } else {
        // Fallback por si el componente padre no pasó la función
        alert(errorMsg);
      }
    }
  };

  // ... (resto del código igual)
  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit ? "Editar Trivia" : "Crear Trivia 🎉"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Completa los siguientes campos para {isEdit ? "editar" : "crear"}{" "}
              la trivia:
            </DialogContentText>

            <TextField
              margin="dense"
              label="Título"
              fullWidth
              name="title"
              value={triviaData.title}
              onChange={handleChange}
              required
            />

            {isEdit && (
              <TextField
                margin="dense"
                label="Slug (ruta amigable)"
                fullWidth
                name="slug"
                value={triviaData.slug || ""}
                onChange={(e) =>
                  setTriviaData((prev) => ({
                    ...prev,
                    slug: e.target.value
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, ""),
                  }))
                }
                helperText="Usado en la URL (solo letras, números y guiones)"
              />
            )}

            <TextField
              margin="dense"
              label="Descripción"
              fullWidth
              name="description"
              value={triviaData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
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
              rows={6}
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
              {isEdit ? "Editar" : "Crear Trivia"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default FormTrivias;
