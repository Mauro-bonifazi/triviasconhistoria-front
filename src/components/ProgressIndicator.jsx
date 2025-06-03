import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const ProgressIndicator = ({ progress }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{ color: "#64b5f6" }}
        size={60}
        thickness={5}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressIndicator;
