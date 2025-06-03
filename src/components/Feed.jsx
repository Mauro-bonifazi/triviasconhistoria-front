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
      <Grid container spacing={2}>
        {questions.map((trivias) => (
          <Grid item xs={12} sm={6} md={4} key={trivias._id}>
            <br />
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    trivias.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKejGlg8-P06Ixi4WqCQMtb-gbGbmdRStf2Q&s"
                  }
                  alt={trivias.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {trivias.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily={"Roboto"}
                  >
                    {trivias.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => navigate(`/questions/${trivias.title}`)}
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 2,
                    maxWidth: "400px",
                    alignSelf: "center",
                    padding: "12px",
                    fontSize: "12px",
                  }}
                >
                  Jugar Trivia
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
