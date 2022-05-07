import { Box, Button, Divider, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFileBase64 } from "../../util/requests";

export default function AdminItem({
  title,
  idImage,
  idItem,
  deleteItem = null,
  updateItem = null,
  seeMoreItem = null,
  squareImage = false,
}) {
  const [image, setImage] = useState(null);

  async function getImage() {
    if (idImage) {
      const res = await fetchFileBase64(idImage);
      if (res.status === 200) setImage((await res.json()).file_content);
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Paper elevation={3} sx={{ marginY: "10px" }}>
      <div className="admin-item">
        {image && (
          <div className="admin-item__img-cont">
            <img
              className={squareImage ? "admin-item__img-cont--square-img" : ""}
              src={image}
              alt="artist image"
            />
          </div>
        )}
        <div className="admin-item__content">
          <p className="admin-item__title">{title}</p>
          <Divider sx={{ marginY: "20px" }} />
          <CrudButtons
            idItem={idItem}
            seeItem={null}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
      </div>
    </Paper>
  );
}

function CrudButtons({ idItem, seeItem, deleteItem, updateItem }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {deleteItem && (
        <Button
          sx={{ marginX: "5px" }}
          color="error"
          variant="contained"
          onClick={() => {
            deleteItem(idItem);
          }}
        >
          Delete
        </Button>
      )}
      {updateItem && (
        <Button
          sx={{ marginX: "5px" }}
          onClick={() => {
            updateItem(idItem);
          }}
        >
          Update
        </Button>
      )}
      <Button sx={{ marginX: "5px" }}>See More</Button>
    </Box>
  );
}
