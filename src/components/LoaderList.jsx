// LoaderList.jsx
import React from "react";
import { Grid } from "@mui/material";
import Loader from "./Loader";

function LoaderList({ count = 3 }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Loader />
        </Grid>
      ))}
    </Grid>
  );
}

export default LoaderList;
