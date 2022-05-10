import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVolume,
  reducePlayer,
} from "../../../redux/reducers/playerReducer";
import { RootState } from "../../../redux/store";
import { fetchFileBase64 } from "../../../util/requests";

export default function PlayerControl() {
  const dispatch = useDispatch();
  const player = useSelector((res: RootState) => res.player.player);
  const [image, setImage] = useState(null);

  function closeOnContainerClick(e) {
    if (e.target === e.currentTarget) {
      closePlayer();
    }
  }

  async function getAlbumImage() {
    try {
      const res = await fetchFileBase64(player.song.idImage);
      if (res.status === 200) {
        setImage((await res.json()).file_content);
      }
    } catch (error) {}
  }

  function closePlayer() {
    dispatch(reducePlayer());
  }

  useEffect(() => {
    if (player.song) {
      getAlbumImage();
    }
  }, [player]);

  function onVolumeChange(e) {
    const volume = e.target.volume;
    dispatch(changeVolume(volume));
  }

  return (
    <div
      className={
        "player-ctl" + (!player.other.expanded || !player.song ? " hidden" : "")
      }
      id="player-cli"
      onClick={closeOnContainerClick}
    >
      <div className="player-cli__info-cont">
        {image && <img src={image} alt="" />}
        {player.song && (
          <div className="player-cli__info-section">
            <p className="player-ctl__song-name">{player.song.songName}</p>
            <p className="player-ctl__artist-name">{player.song.singer}</p>
          </div>
        )}
      </div>
      <div className="player-ctl__comp-cont">
        <AudioPlayer
          onVolumeChange={onVolumeChange}
          showJumpControls={false}
          src={player.song ? player.song.file : ""}
          volume={player.other.volume}
        />
      </div>
    </div>
  );
}
