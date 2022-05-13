import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import offerImg from "../img/flash-sale.gif";
import { fetchUserAddresses, requestBuyItems } from "../util/requests";
import {
  showError,
  showSuccess,
  showWarning,
} from "../redux/reducers/errorReducer";
import { deleteAll } from "../redux/reducers/shoppingCarReducer";

export default function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const shoppingStore = useSelector(
    (state: RootState) => state.shoppingCar.shoppingCar
  );
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [actualAddress, setActualAddress] = useState("");
  const dispatch = useDispatch();

  function getTotalPrice() {
    let total = 0;
    shoppingStore.forEach((item) => {
      total += Number.parseFloat(item.price);
    });
    setTotalPrice(total);
  }

  async function getAddresses() {
    try {
      const res = await fetchUserAddresses();
      if (res.status === 200) {
        setAddresses(await res.json());
      }
    } catch (error) {}
  }

  async function buyItems() {
    try {
      if (!actualAddress) {
        dispatch(showWarning(`Choose an address`));
        return;
      }

      const itemsToBuy = [];
      shoppingStore.forEach((shoppingItem) => {
        itemsToBuy.push({ idItem: shoppingItem.idItem });
      });

      const res = await requestBuyItems(itemsToBuy);
      if (res.status === 200) {
        dispatch(deleteAll());
        dispatch(showSuccess(`Success - The items are yours !!!`));
        navigate("/my-songs");
      } else {
        dispatch(showError(`Error - Cannot buy items`));
      }
    } catch (error) {
      dispatch(showError(`Error - ${error}`));
    }
  }

  useEffect(() => {
    if (shoppingStore.length === 0) {
      navigate("/");
    }
    getAddresses();
    getTotalPrice();
  }, []);

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
              <Typography textAlign={"center"} variant="h4">
                Payment
              </Typography>
              <Divider sx={{ marginY: "30px" }} />
              <Box>
                <img style={{ width: "100%" }} src={offerImg} alt="" />
                <Typography
                  textAlign={"center"}
                  color={"#bb0000"}
                  fontSize={"1.2rem"}
                >
                  Enjoy free songs for our website premiere
                </Typography>

                <Divider
                  sx={{ display: "box", width: "100%", marginY: "30px" }}
                />

                <Typography sx={{ fontSize: "1.2rem" }}>
                  Choose Your location
                </Typography>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={actualAddress}
                  label="Age"
                  onChange={(e) => {
                    setActualAddress(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                >
                  {addresses.map((item, key) => {
                    return (
                      <MenuItem
                        key={`item-address-${key}`}
                        value={item.id_address}
                      >
                        {item.address}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Link
                  to={"/address-management"}
                  style={{
                    textAlign: "right",
                    display: "block",
                    margin: "10px 0",
                  }}
                >
                  Create an address
                </Link>

                <Typography
                  fontSize={"1.6rem"}
                  fontWeight={"bold"}
                  color={"#00bb00"}
                  textAlign={"center"}
                  sx={{ textDecoration: "line-through" }}
                >
                  $ {totalPrice}
                </Typography>

                <Button
                  sx={{ marginTop: "20px", display: "block", width: "100%" }}
                  variant={"contained"}
                  onClick={buyItems}
                >
                  Purchase
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
