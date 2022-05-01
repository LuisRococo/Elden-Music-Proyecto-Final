import React from "react";
import musicDiskGif from "../../../img/music-disk.gif";

export default function PlayerBtn() {
  return (
    <div className="player-btn">
      <img className="player-btn__img" src={musicDiskGif} alt="" />
    </div>
  );
}
