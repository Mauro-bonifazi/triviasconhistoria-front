// src/components/ImageUpload.jsx
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "trivias_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzhlkmrq0/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      onUpload(imageUrl); // lo envía al padre
    } catch (error) {
      console.error("Error al subir imagen", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Subir imagen para la trivia
      </Typography>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <Typography variant="caption">Subiendo...</Typography>}
      {preview && (
        <Box
          component="img"
          src={preview}
          sx={{ mt: 2, width: 100, borderRadius: 2 }}
        />
      )}
    </Box>
  );
};

export default ImageUpload;
