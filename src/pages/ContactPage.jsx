import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [contact, setContact] = useState({
    user_name: "",
    user_lastname: "",
    user_email: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    const formData = {
      user_name: contact.user_name,
      user_lastname: contact.user_lastname,
      user_email: contact.user_email,
      to_email: contact.user_email, // NECESARIO para enviar al usuario
      message: contact.message,
      date: new Date().toLocaleString("es-AR"),
    };

    // ✅ Enviar a administrador (plantilla Contact Us)
    emailjs
      .send(
        "service_k9bj01h",
        "template_yfag7pa", // plantilla para admin
        formData,
        "MhNTIBpkaTGTw_GJU"
      )
      .then((result) => {
        // ✅ Enviar confirmación al usuario (plantilla Auto-Reply)
        return emailjs.send(
          "service_k9bj01h",
          "template_ezjxz4j", // plantilla para usuario
          formData,
          "MhNTIBpkaTGTw_GJU"
        );
      })
      .then(() => {
        setOpen(true);
        setSnackbarMessage("Mensaje enviado con éxito");
        setSnackbarSeverity("success");
        setContact({
          user_name: "",
          user_lastname: "",
          user_email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error al enviar mensaje:", error);
        setOpen(true);
        setSnackbarMessage("Error al enviar el mensaje, Proba nuevamente");
        setSnackbarSeverity("error");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  return (
    <Container sx={{ marginTop: "64px" }}>
      <Typography variant="h4" gutterBottom>
        ¿Querés decirnos algo?
      </Typography>

      <Typography variant="body1" gutterBottom>
        Completá el formulario y enviános tu consulta, comentario o sugerencia
        para futuras trivias. Nos encanta saber qué pensás de nuestras trivias y
        cómo podemos mejorar la experiencia.
      </Typography>

      <Typography variant="body2" color="textSecondary">
        Respondemos a la brevedad. ¡Gracias por formar parte de Trivias con
        Historia!
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          margin="normal"
          name="user_name"
          value={contact.user_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Apellido"
          margin="normal"
          name="user_lastname"
          value={contact.user_lastname}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="user_email"
          type="email"
          value={contact.user_email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Mensaje"
          margin="normal"
          name="message"
          multiline
          rows={4}
          value={contact.message}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" sx={{ mt: 2, mb: 2 }}>
          Enviar
        </Button>
      </form>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;
