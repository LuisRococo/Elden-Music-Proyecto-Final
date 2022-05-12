import { Label } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  getRatingUtilityClass,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddressItem from "../components/address/AddressItem";
import SectionHeader from "../components/general/SectionHeader";
import { showError, showSuccess } from "../redux/reducers/errorReducer";
import { fetchUserAddresses, requestCreateAddress } from "../util/requests";

export default function AddressPage() {
  const [newAddress, setNewAddress] = useState("");
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);

  async function createAddress() {
    try {
      const res = await requestCreateAddress(newAddress);
      if (res.status === 200) {
        setNewAddress("");
        dispatch(showSuccess("Success"));
        getAddresses();
      } else {
        dispatch(showError("Failure"));
      }
    } catch (error) {
      dispatch(showError("Failure, " + error));
    }
  }

  async function getAddresses() {
    try {
      const res = await fetchUserAddresses();
      if (res.status === 200) {
        setAddresses(await res.json());
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ebebeb" }}>
      <SectionHeader title={"Address Management"} />
      <Container maxWidth={"lg"} sx={{ padding: "6%" }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: "30px" }}>
              <Typography textAlign={"center"} variant="h4">
                Add new address
              </Typography>
              <Divider sx={{ marginY: "25px" }} />

              <TextField
                sx={{ width: "100%", marginBottom: "20px" }}
                label={"New Address"}
                value={newAddress}
                onChange={(e) => {
                  setNewAddress(e.target.value);
                }}
                required={true}
              />
              <Button onClick={createAddress} sx={{ width: "100%" }}>
                Create
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {addresses.length !== 0 && (
          <Box sx={{ marginTop: "40px" }}>
            {addresses.map((address, key) => {
              return (
                <AddressItem
                  address={address.address}
                  idAddress={address.id_address}
                  key={"addresses-" + key}
                  onDelete={() => {
                    getAddresses();
                  }}
                />
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
