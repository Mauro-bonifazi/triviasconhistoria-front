import { Container, TextField, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getQuestions } from "../api/triviaApi";
import Feed from "../components/Feed";
import Loader from "../components/Loader";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Inicia en true para mostrar el loader

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        console.log("Datos recibidos del backend:", data);
        setQuestions(data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      } finally {
        setLoading(false); // Se oculta el loader al terminar la carga
      }
    };
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4, mt: 6 }}
      >
        Buscar trivias
      </Typography>
      <TextField
        label="Buscar"
        variant="outlined"
        margin="normal"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Busca tu trivia favorita"
      />
      <Divider sx={{ my: 4 }} /> {/* separador con margen vertical */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
      >
        Todas Las Trivias
      </Typography>
      {loading ? <Loader /> : <Feed questions={filteredQuestions} />}
    </Container>
  );
}

export default HomePage;
