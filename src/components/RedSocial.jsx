import React from "react";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";

const RedSocial = () => {
  return (
    <div>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, color: "#BFA45F" }}
      >
        Seguinos en nuestras redes sociales:
      </Typography>

      <Link href="https://www.facebook.com/" target="_blank">
        <FacebookIcon />
      </Link>

      <Link href="https://instagram.com/" target="_blank">
        <InstagramIcon />
      </Link>
      <Link href="https://linkedin.com/" target="_blank">
        <LinkedInIcon />
      </Link>
    </div>
  );
};
export default RedSocial;
