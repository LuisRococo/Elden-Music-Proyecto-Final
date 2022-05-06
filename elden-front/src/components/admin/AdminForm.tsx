import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function AdminForm({ title, children }) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        marginTop: "10px",
        marginX: "auto",
      }}
    >
      <Paper elevation={7} sx={{ padding: "30px" }}>
        <Typography textAlign={"center"} variant="h3">
          {title}
        </Typography>
        <Divider sx={{ marginY: "30px" }} />

        {children}
      </Paper>
    </Grid>
  );
}
