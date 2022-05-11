import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  fetchFileSongBase64,
  fetchIsSongBought,
  fetchSong,
} from "../../util/requests";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../redux/reducers/errorReducer";
import { expandPlayer, setSong } from "../../redux/reducers/playerReducer";
import { RootState } from "../../redux/store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { doesItemAlreadyExists } from "../../util/other";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddShoppingCart } from "@mui/icons-material";
import { addSong, removeItem } from "../../redux/reducers/shoppingCarReducer";

export default function SongItem({
  idSong,
  nameSong,
  singerName,
  duration,
  idImage,
  priceSong,
  idAlbum,
  isVirtual,
}) {
  const dispatch = useDispatch();
  const [isBoughtm, setIsBought] = useState(false);
  const shoppingCar = useSelector(
    (state: RootState) => state.shoppingCar.shoppingCar
  );
  async function playSong() {
    try {
      const res = await fetchFileSongBase64(idSong);
      if (res.status === 200) {
        const song = await res.json();
        dispatch(expandPlayer());
        dispatch(
          setSong({
            song: song.file_content,
            songName: nameSong,
            singer: singerName,
            idSong: idSong,
            idImage: idImage,
          })
        );
      } else {
        dispatch(showError("Music cannot be played"));
      }
    } catch (error) {
      console.info(error);

      dispatch(showError("Music cannot be played"));
    }
  }

  function shouldShowOwnedIcon() {
    return isBoughtm;
  }

  function shouldShowBuyIcon() {
    return (
      !isBoughtm &&
      !isAlbumInShoppingList() &&
      !doesItemAlreadyExists(shoppingCar, idSong, true)
    );
  }

  function shouldShowRemoveFromStoreIcon() {
    return (
      !isBoughtm &&
      doesItemAlreadyExists(shoppingCar, idSong, true) &&
      !isAlbumInShoppingList()
    );
  }

  function isAlbumInShoppingList() {
    return doesItemAlreadyExists(shoppingCar, idAlbum, false);
  }

  async function isSongBought() {
    try {
      const res = await fetchIsSongBought(idSong);
      if (res.status === 200) setIsBought((await res.json()).response);
    } catch (error) {}
  }

  function storeInShoppingCar() {
    dispatch(addSong({ idItem: idSong, isVirtual: false }));
  }

  function removeFromShoppingCar() {
    dispatch(removeItem({ idItem: idSong, isSong: true }));
  }

  useEffect(() => {
    isSongBought();
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        marginY: "6px",
        width: "100%",
        paddingY: "10px",
        paddingX: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <IconButton aria-label="delete" size="medium" onClick={playSong}>
          <PlayArrowIcon />
        </IconButton>
        <p className="song-item__time">{duration}</p>
        <p className="song-item__name">{nameSong}</p>
      </Box>
      <Box>
        {isVirtual && (
          <>
            {shouldShowOwnedIcon() && <CheckCircleIcon />}
            {shouldShowRemoveFromStoreIcon() && (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={removeFromShoppingCar}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
            {shouldShowBuyIcon() && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography marginRight="10px" color="#00bb00">
                  ${priceSong}
                </Typography>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={storeInShoppingCar}
                >
                  <ShoppingCartIcon fontSize="inherit" />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}
