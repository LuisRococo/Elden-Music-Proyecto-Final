import { Container } from "@mui/material";
import React from "react";

export default function SectionHeader({ title }) {
  return (
    <div className="sec-header">
      <Container maxWidth="lg">
        <h3>{title}</h3>
      </Container>
    </div>
  );
}
