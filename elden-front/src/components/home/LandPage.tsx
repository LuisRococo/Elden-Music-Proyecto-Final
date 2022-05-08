import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import headphoneImg from "../../img/white-headphones.webp";

export default function LandPage() {
  return (
    <div className="land-page">
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <div className="land-page__content">
          <div className="land-page__info">
            <h2 className="land-page__title">Get lost into music</h2>
            <p className="land-page__">Everything you need is here</p>
          </div>
          <Box
            sx={{
              display: { md: "flex", xs: "none" },
              justifyContent: "center",
              alignItems: "center",
              flex: "1",
            }}
          >
            <img className="land-page__img" src={headphoneImg} alt="" />
          </Box>
        </div>
      </Container>
    </div>
  );
}
