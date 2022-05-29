import { Button, Divider, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { fetchFileBase64, fetchFileSongBase64 } from "../../util/requests";
import { useDispatch } from "react-redux";
import {
  expandPlayer,
  reducePlayer,
  setSong,
} from "../../redux/reducers/playerReducer";

export default function UserSong({ idSong, idImage, songName, singerName }) {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  async function getImage() {
    try {
      const res = await fetchFileBase64(idImage);
      if (res.status === 200) {
        setImage((await res.json()).file_content);
      }
    } catch (error) {}
  }

  async function playSong() {
    try {
      const res = await fetchFileSongBase64(idSong);
      if (res.status === 200) {
        const params = {
          song: (await res.json()).file_content,
          singer: singerName,
          songName,
          idSong,
          idImage,
        };
        dispatch(expandPlayer());
        dispatch(setSong(params));
      }
    } catch (error) {}
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Paper elevation={2} sx={{ padding: "20px" }}>
      <div className="user-song">
        {image && <img src={image} alt="" />}
        <div className="user-song__info-cont">
          <p className="user-song__title">{songName}</p>
          <p className="user-song__singer">{singerName}</p>
          <Divider sx={{ marginY: "20px" }} />
          <div className="user-song__ctl-cont">
            <IconButton aria-label="delete" size="large" onClick={playSong}>
              <PlayCircleIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </Paper>
  );
}
