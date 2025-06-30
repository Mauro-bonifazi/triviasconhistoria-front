import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getQuestions } from "../api/triviaApi";
import Feed from "../components/Feed";
import LoaderList from "../components/LoaderList";

function SearchPage() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Hook para leer y escribir en los parámetros de la URL
  const [searchParams, setSearchParams] = useSearchParams();

  // --- EFECTOS PARA MANEJAR LA LÓGICA ---

  // Efecto 1: Carga TODAS las trivias una sola vez al montar el componente.
  useEffect(() => {
    const fetchAllQuestions = async () => {
      setLoading(true);
      try {
        const data = await getQuestions();
        setAllQuestions(data);
      } catch (error) {
        console.error("Error al obtener todas las trivias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllQuestions();
  }, []); // Array vacío significa que solo se ejecuta al montar.

  // Efecto 2: Sincroniza el estado del buscador con el parámetro 'q' de la URL.
  // Esto es clave para que la redirección desde la HomePage funcione.
  useEffect(() => {
    const queryFromUrl = searchParams.get("q") || ""; // Obtiene 'q' o un string vacío
    setSearchTerm(queryFromUrl);
  }, [searchParams]); // Se ejecuta cada vez que los parámetros de la URL cambian.

  // --- LÓGICA DE FILTRADO OPTIMIZADA ---

  // Usamos useMemo para que el filtrado solo se re-ejecute si la lista de preguntas
  // o el término de búsqueda cambian. Mejora la performance.
  const filteredQuestions = useMemo(
    () =>
      allQuestions.filter((question) =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, allQuestions]
  );

  /**
   * Actualiza el estado del buscador y el parámetro 'q' en la URL
   * mientras el usuario escribe.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Actualiza la URL en tiempo real. Si el campo está vacío, quita el parámetro.
    if (newSearchTerm) {
      setSearchParams({ q: newSearchTerm });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
      >
        Explora Todas las Trivias
      </Typography>

      {/* El campo de búsqueda de esta página */}
      <TextField
        id="searchpage-search"
        label="Buscar entre todas las trivias"
        variant="outlined"
        margin="normal"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Escribe aquí para filtrar los resultados..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Separador visual */}
      <Box sx={{ my: 4 }} />

      {/* --- RENDERIZADO CONDICIONAL DE RESULTADOS --- */}
      {loading ? (
        <LoaderList count={9} />
      ) : (
        <>
          <Feed questions={filteredQuestions} />
          {/* Mensaje para cuando no se encuentran resultados */}
          {!loading && filteredQuestions.length === 0 && searchTerm && (
            <Box sx={{ textAlign: "center", my: 6 }}>
              <Typography variant="h6">
                No se encontraron resultados para "{searchTerm}"
              </Typography>
              <Typography color="text.secondary">
                Intenta con otras palabras o revisa la ortografía.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default SearchPage;
