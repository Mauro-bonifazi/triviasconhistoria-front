import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as logUser } from "../api/triviaApi";

const Login = ({ onLogin }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    console.log(loginData);
    try {
      const response = await logUser({
        email: loginData.email,
        password: loginData.password,
      });
      const { token } = response.data;

      // Guardamos en localStorage el token
      localStorage.setItem("token", token);

      // Notificar login correcto al contexto
      login(token);
      navigate("/panel");
    } catch (error) {
      if (error.response) {
        // Error con respuesta del servidor
        if (error.response.status === 401) {
          alert("Login fallido, credenciales incorrectas");
        } else {
          alert(`Error en el servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        // El servidor no respondió
        console.error("Error: No se pudo establecer conexión con el servidor");
      } else {
        // Error al configurar la solicitud
        console.error(
          "Error en la configuración de la solicitud",
          error.message
        );
      }
    }
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <h4>Por favor, para acceder, identifíquese</h4>
      <form>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          type="button"
          sx={{ mt: 2 }}
        >
          {" "}
          {/*aca te cambie el boton a tipo button y el login manejarlo en el onclick para que no recargue la pagina  */}
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
