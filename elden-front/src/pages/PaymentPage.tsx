import {
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import offerImg from "../img/flash-sale.gif";

export default function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const shoppingStore = useSelector(
    (state: RootState) => state.shoppingCar.shoppingCar
  );
  const navigate = useNavigate();

  function getTotalPrice() {
    let total = 0;
    shoppingStore.forEach((item) => {
      total += Number.parseFloat(item.price);
    });
    setTotalPrice(total);
  }

  if (shoppingStore.length === 0) {
    navigate("/");
  }

  return (
    <div className="pay-pg">
      <Container
        maxWidth={"lg"}
        sx={{
          paddingY: "7%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ padding: "30px" }}>
              <Typography textAlign={"center"} variant="h3">
                Payment
              </Typography>
              <Divider sx={{ marginY: "30px" }} />
              <Box
                sx={
                  {
                    // display: "flex",
                    // flexDirection: "column",
                    // alignItems: "center",
                  }
                }
              >
                <img style={{ width: "100%" }} src={offerImg} alt="" />

                <Divider
                  sx={{ display: "box", width: "100%", marginY: "30px" }}
                />

                <Typography sx={{ fontSize: "1.2rem" }}>
                  Choose Your location
                </Typography>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={12}
                  label="Age"
                  onChange={null}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <Typography
                  fontSize={"1.6rem"}
                  fontWeight={"bold"}
                  color={"#00bb00"}
                  textAlign={"right"}
                  sx={{ textDecoration: "line-through" }}
                >
                  $ {totalPrice}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
