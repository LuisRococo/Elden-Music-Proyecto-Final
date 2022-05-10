import { Container } from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import EmptyResults from "../components/EmptyResults";
import SectionDivisor from "../components/general/SectionDivisor";
import SectionHeader from "../components/general/SectionHeader";
import { RootState } from "../redux/store";

export default function ShoppingCarPage() {
  const car = useSelector((state: RootState) => state.shoppingCar.shoppingCar);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "f0f0f0" }}>
      <SectionHeader title={"Shopping Car"} />

      <Container sx={{ padding: "6%", maxWidth: "lg" }}>
        <SectionDivisor title="Items" />

        {car.length === 0 && <EmptyResults />}
      </Container>
    </Box>
  );
}
