import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function TotalPriceComp({ price }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ padding: "30px" }}>
          <Typography textAlign={"center"} variant="h5">
            Total
          </Typography>
          <Divider sx={{ marginY: "30px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              textAlign={"center"}
              variant="h5"
              sx={{ marginBottom: "20px", color: "#75b908" }}
            >
              $ {price}
            </Typography>
            <Link
              to={"/payment-page"}
              style={{
                textDecoration: "none",
                display: "block",
                margin: "0 auto",
              }}
            >
              <Button>Purchase</Button>
            </Link>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
