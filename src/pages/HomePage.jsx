import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Banner from "../components/Banner";
import Intro from "../components/Intro";
import Feed from "../components/Feed";
import LoaderList from "../components/LoaderList";
import { getPopularQuestions } from "../api/triviaApi";
import { Helmet } from "react-helmet-async";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [popularTrivias, setPopularTrivias] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);

  // hook de React Router para navegar programáticamente
  const navigate = useNavigate();

  // Carga las trivias populares al iniciar la página
  React.useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularQuestions();
        setPopularTrivias(data);
      } catch (error) {
        console.error("Error cargando trivias populares:", error);
      } finally {
        setLoadingPopular(false);
      }
    };
    fetchPopular();
  }, []); // El array vacío asegura que se ejecute solo una vez

  /**
   * Maneja el envío del formulario de búsqueda.
   * Previene la recarga de la página y navega a /search.
   * @param {React.FormEvent} event
   */
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    if (searchTerm.trim()) {
      // Redirige a la página de búsqueda con el término como parámetro en la URL.
      // encodeURIComponent se asegura de que caracteres especiales (espacios, etc.) se manejen bien.
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <Helmet>
        {/* Título principal del sitio */}
        <title>
          Trivias con Historia | Aprendé jugando sobre hechos historicos
          destacados.
        </title>

        {/* Descripción clara para buscadores */}
        <meta
          name="description"
          content="Jugá y aprendé con las mejores trivias históricas. Descubrí hechos, personajes y procesos de la historia argentina de forma divertida e interactiva."
        />

        {/* Palabras clave SEO bien definidas */}
        <meta
          name="keywords"
          content="trivias históricas, historia argentina, trivias educativas, trivias de historia, revolución de mayo, independencia, Manuel Belgrano, trivias escolares"
        />

        {/* Autor del proyecto */}
        <meta name="author" content="Mauro Bonifazi" />

        {/* Etiquetas Open Graph (redes sociales) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Trivias con Historia" />
        <meta
          property="og:description"
          content="Poné a prueba tus conocimientos sobre historia argentina. Jugá, aprendé y compartí tus resultados con las mejores trivias históricas."
        />
        <meta
          property="og:image"
          content="https://triviasconhistoria-front.vercel.app/images/banner-historia.png"
        />
        <meta
          property="og:url"
          content="https://triviasconhistoria-front.vercel.app/"
        />

        {/* Etiquetas Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trivias con Historia" />
        <meta
          name="twitter:description"
          content="Jugá y aprendé sobre la historia argentina con trivias interactivas. Ideal para estudiantes, curiosos y docentes."
        />
        <meta
          name="twitter:image"
          content="https://triviasconhistoria-front.vercel.app/images/banner-historia.png"
        />
      </Helmet>

      <Box>
        {/* 1. COMPONENTE BANNER */}
        <Banner />

        <Container>
          {/* 2. COMPONENTE INTRO */}
          <Box sx={{ my: { xs: 4, md: 6 } }}>
            <Intro />
          </Box>

          {/* 3. FORMULARIO DE BÚSQUEDA RÁPIDA */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              maxWidth: "700px",
              mx: "auto", // Centra el formulario
              my: { xs: 4, md: 6 },
              p: { xs: 2, md: 3 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
            >
              ¿Qué trivia buscas hoy?
            </Typography>
            <TextField
              id="homepage-search"
              label="Busca por título, tema o palabra clave..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Buscar
            </Button>
          </Box>

          {/* 4. SECCIÓN DE TRIVIAS POPULARES */}
          <Box sx={{ my: { xs: 4, md: 8 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
            >
              Trivias Populares
            </Typography>
            {loadingPopular ? (
              <LoaderList count={3} />
            ) : (
              <Feed questions={popularTrivias} />
            )}
          </Box>

          {/* 5. BOTÓN FINAL PARA VER TODO */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: { xs: 4, md: 6 },
            }}
          >
            <Button
              component={Link}
              to="/search"
              variant="outlined"
              size="large"
            >
              Ver todas las trivias
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
