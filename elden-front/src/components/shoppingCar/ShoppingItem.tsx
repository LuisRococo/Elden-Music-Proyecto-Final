import { Divider, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchAlbum, fetchFileBase64, fetchSong } from "../../util/requests";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeItem } from "../../redux/reducers/shoppingCarReducer";

export default function ShoppingItem({ idItem, isSong, price }) {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const dispatch = useDispatch();

  async function getSong() {
    try {
      const res = await fetchSong(idItem);
      if (res.status === 200) {
        const resObj = await res.json();
        setItemName(resObj.song_name);
        getImage(resObj.Album.id_image);
      }
    } catch (error) {}
  }

  async function getAlbum() {
    try {
      const res = await fetchAlbum(idItem);
      if (res.status === 200) {
        const resObj = await res.json();
        setItemName(resObj.album_name);
        getImage(resObj.id_image);
      }
    } catch (error) {}
  }

  async function getImage(idImage) {
    try {
      const res = await fetchFileBase64(idImage);
      if (res.status === 200) setImage((await res.json()).file_content);
    } catch (error) {}
  }

  function getItem() {
    if (isSong) getSong();
    else getAlbum();
  }

  function removeFromShoppingCar() {
    dispatch(removeItem({ idItem: idItem, isSong: isSong }));
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <Paper sx={{ padding: "30px" }} elevation={2}>
      <div className="store-item">
        {image && (
          <img
            className={!isSong ? "store-item__album-img" : ""}
            src={image}
            alt=""
          />
        )}
        <div className="store-item__info">
          <p className="store-item__name">{itemName}</p>
          <p className="store-item__type">{isSong ? "Song" : "Album"}</p>
          <Divider sx={{ marginY: "30px" }} />
          <div className="store-item__controls">
            <p className="store-item__price">${price}</p>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={removeFromShoppingCar}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </Paper>
  );
}
