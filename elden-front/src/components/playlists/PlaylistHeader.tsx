import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../redux/reducers/errorReducer";
import { requestDeletePlaylist } from "../../util/requests";

export default function PlaylistHeader({
  idPlaylist,
  playlistName,
  onDelete,
  addSongInfo,
  setAddSongInfo,
}) {
  const dispatch = useDispatch();

  async function deletePlaylist() {
    try {
      const res = await requestDeletePlaylist(idPlaylist);
      if (res.status === 200) {
        dispatch(showSuccess("Playlist deleted"));
        onDelete();
      } else {
        dispatch(showError("Something wrong happened"));
      }
    } catch (error) {
      dispatch(showError(`Error - ${error}`));
    }
  }

  function showCreatePlaylistform() {
    setAddSongInfo({ id: idPlaylist, name: playlistName });
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          {playlistName}
        </Typography>

        <Box>
          <IconButton
            sx={{ marginLeft: "5px" }}
            color="primary"
            aria-label="Add Song"
            size="small"
            onClick={deletePlaylist}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>

          <IconButton
            sx={{ marginLeft: "5px" }}
            color="primary"
            aria-label="Add Song"
            size="small"
            onClick={showCreatePlaylistform}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ marginY: "30px" }} />
    </Box>
  );
}
