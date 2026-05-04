import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Feed({ questions }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container spacing={3}>
        {questions.map((trivias) => (
          <Grid item xs={12} sm={6} md={4} key={trivias._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              {/* CARD CLICKEABLE */}
              <CardActionArea
                onClick={() => navigate(`/trivia/${trivias.slug}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    trivias.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKejGlg8-P06Ixi4WqCQMtb-gbGbmdRStf2Q&s"
                  }
                  alt={trivias.title}
                />

                <CardContent>
                  {/* TÍTULO */}
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {trivias.title}
                  </Typography>

                  {/* DESCRIPCIÓN RECORTADA */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {trivias.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              {/* BOTÓN */}
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  onClick={() => navigate(`/trivia/${trivias.slug}`)}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    bgcolor: "accent.main",
                    color: "accent.contrastText",
                    "&:hover": {
                      bgcolor: "#b8943a",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  Jugar ahora
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Feed;
