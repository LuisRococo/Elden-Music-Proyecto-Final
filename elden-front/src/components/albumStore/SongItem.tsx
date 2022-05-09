import { Box } from "@mui/system";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SongItem({ idSong, nameSong, duration }) {
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
        <PlayArrowIcon />
        <p className="song-item__time">{duration}</p>
        <p className="song-item__name">{nameSong}</p>
      </Box>
      <Box>
        <CheckCircleIcon />
      </Box>
    </Paper>
  );
}
