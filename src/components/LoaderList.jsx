import React from "react";
import { Grid, Box } from "@mui/material";
import Loader from "./Loader";

function LoaderList({ count = 3 }) {
  return (
    <Box px={2} py={4}>
      <Grid container spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Loader />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LoaderList;
