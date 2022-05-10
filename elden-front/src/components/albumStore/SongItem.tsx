import { Box } from "@mui/system";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchFileSongBase64 } from "../../util/requests";
import { useDispatch } from "react-redux";
import { showError } from "../../redux/reducers/errorReducer";
import { expandPlayer, setSong } from "../../redux/reducers/playerReducer";

export default function SongItem({ idSong, nameSong, duration }) {
  const dispatch = useDispatch();
  async function playSong() {
    try {
      const res = await fetchFileSongBase64(idSong);
      if (res.status === 200) {
        const song = await res.json();
        dispatch(expandPlayer());
        dispatch(setSong(song.file_content));
      } else {
        dispatch(showError("Music cannot be played"));
      }
    } catch (error) {
      dispatch(showError("Music cannot be played"));
    }
  }

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
        <CheckCircleIcon />
      </Box>
    </Paper>
  );
}
