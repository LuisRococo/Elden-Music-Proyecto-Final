import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

export default function SectionDivisor({ title, url = null }) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h3" fontWeight={"bold"}>
          {title}
        </Typography>
        {url && (
          <Link to={url} style={{ textDecoration: "none" }}>
            <IconButton
              sx={{ marginLeft: "5px" }}
              color="primary"
              aria-label="See more"
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Link>
        )}
      </Box>
      <Divider sx={{ marginY: "30px" }} />
    </Box>
  );
}
