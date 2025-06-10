import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getQuestions, deleteTrivia } from "../../api/triviaApi";

import FormTrivias from "../../components/FormTrivias";

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [triviaToDelete, setTriviaToDelete] = useState(null);

  const [trivia, setTrivia] = useState({
    title: "",
    introduction: "",
    image: "",
    description: "",
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

  // Cargar trivias desde la API
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      console.log("Datos recibidos del backend:", data);
      setQuestions(data);
    } catch (error) {
      console.error("Error al obtener las trivias:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleClickOpen = () => {
    setTrivia({
      title: "",
      introduction: "",
      image: "",
      description: "",
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
  };
  // Filtrar trivias por título
  const filteredQuestions = questions
    ? questions.filter((q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Función para editar trivia
  const handleUpdateItem = (trivia) => {
    setTrivia(trivia);
    setOpen(true);
  };

  // Función para eliminar trivia
  const handleDelete = async (id) => {
    setTriviaToDelete(id);
    setOpenConfirmDialog(true);
  };
  //Función para confirmar eliminación
  const confirmDelete = async () => {
    if (!triviaToDelete) return;

    try {
      await deleteTrivia(triviaToDelete);
      fetchQuestions(); // Recargar datos después de eliminar
      setSnackbarMessage("Trivia eliminada exitosamente ❌");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al eliminar la trivia", error);
      setSnackbarMessage("Error al eliminar la trivia ❌");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }

    setOpenConfirmDialog(false);
  };

  return (
    <Container>
      <h1>Panel de Administración</h1>

      {/* Filtro de búsqueda */}
      <TextField
        label="Buscar por título"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: "1rem" }}
      >
        Agregar Trivia
      </Button>

      {/* Formulario para agregar trivias */}
      <FormTrivias
        fetchData={fetchQuestions}
        setSnackbarMessage={setSnackbarMessage} // Usa este correctamente
        setOpenSnackbar={setOpenSnackbar}
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        setOpen={setOpen}
        trivia={trivia}
        setSnackbarSeverity={setSnackbarSeverity}
      />
      <br />

      {/* Tabla de trivias */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trivia</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Introducción</TableCell>

              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((trivia) => (
              <TableRow key={trivia._id}>
                <TableCell>{trivia.title}</TableCell>
                <TableCell>{trivia.description}</TableCell>
                <TableCell>{trivia.introduction}</TableCell>

                <TableCell>
                  <Avatar
                    alt={trivia.title}
                    src={trivia.image}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateItem(trivia)}
                    style={{ marginRight: "8px" }}
                  >
                    Editar
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(trivia._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas eliminar esta trivia? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
