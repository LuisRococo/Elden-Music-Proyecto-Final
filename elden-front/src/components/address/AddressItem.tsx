import { Button, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../redux/reducers/errorReducer";
import { requestDeleteAddress } from "../../util/requests";

export default function AddressItem({ idAddress, address, onDelete }) {
  const dispatch = useDispatch();

  async function deleteItem() {
    try {
      const res = await requestDeleteAddress(idAddress);
      if (res.status === 200) {
        dispatch(showSuccess("Successs"));
        onDelete();
      }
    } catch (error) {
      dispatch(showError("Error - " + error));
    }
  }

  return (
    <Paper
      sx={{
        marginY: "5px",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 30px",
      }}
    >
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <PlaceIcon sx={{ marginRight: "15px" }} />
        <Typography>{address}</Typography>
      </Box>
      <IconButton aria-label="delete" size="large" onClick={deleteItem}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Paper>
  );
}
