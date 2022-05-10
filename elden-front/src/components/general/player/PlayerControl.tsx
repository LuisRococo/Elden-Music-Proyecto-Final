import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { reducePlayer } from "../../../redux/reducers/playerReducer";
import { RootState } from "../../../redux/store";

export default function PlayerControl() {
  const dispatch = useDispatch();
  const player = useSelector((res: RootState) => res.player.player);

  function closeOnContainerClick(e) {
    if (e.target === e.currentTarget) {
      closePlayer();
    }
  }

  function closePlayer() {
    dispatch(reducePlayer());
  }

  return (
    <div
      className={"player-ctl" + (!player.other.expanded ? " hidden" : "")}
      id="player-cli"
      onClick={closeOnContainerClick}
    >
      <div className="player-cli__info-cont">
        <img
          src="https://resources.tidal.com/images/3b2a7625/f1cc/41d8/b3f9/897cacc911b0/640x640.jpg"
          alt=""
        />
        <div className="player-cli__info-section">
          <p className="player-ctl__song-name">Song Name</p>
          <p className="player-ctl__artist-name">Artist Name</p>
        </div>
      </div>
      <div className="player-ctl__comp-cont">
        <AudioPlayer showJumpControls={false} src={player.song} />
      </div>
    </div>
  );
}
