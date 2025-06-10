import {
  Container,
  TextField,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getQuestions } from "../api/triviaApi";
import Feed from "../components/Feed";
import LoaderList from "../components/LoaderList";
import Banner from "../components/Banner";
import Intro from "../components/Intro";
import { Link } from "react-router-dom";

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
        console.error("Error al obtener las trivias:", error);
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
    <div>
      <Banner />
      <Divider
        sx={{
          width: "80%", // ajustá este valor como quieras
          borderBottomWidth: "5px", // grosor
          mx: "auto", // centra el divider horizontalmente
          my: 6, // margen vertical opcional
        }}
      />
      <Container>
        <Intro />
        <Divider
          sx={{
            width: "80%", // ajustá este valor como quieras
            borderBottomWidth: "5px", // grosor
            mx: "auto", // centra el divider horizontalmente
            my: 6, // margen vertical opcional
          }}
        />

        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "#5b4a2f",
          }}
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
          placeholder="Ej: Revolución de Mayo, El hundimiento del Titanic, Invasiones Inglesas..."
        />
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4, mt: 6 }}
        >
          Trivias populares
        </Typography>
        {loading ? (
          <LoaderList count={3} />
        ) : (
          <Feed questions={filteredQuestions.slice(0, 3)} />
        )}
        <br></br>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            color="primary"
          >
            Ver todas las trivias
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
