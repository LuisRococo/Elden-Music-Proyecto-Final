import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function SectionDivisor({ title }) {
  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"}>
        {title}
      </Typography>
      <Divider sx={{ marginTop: "10px" }} />
    </Box>
  );
}
