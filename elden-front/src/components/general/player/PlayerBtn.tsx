import React from "react";
import musicDiskGif from "../../../img/music-disk.gif";

export default function PlayerBtn({ showPlayer, setShowPlayer }) {
  return (
    <div
      className={"player-btn " + (showPlayer ? "hidden" : "")}
      onClick={() => {
        setShowPlayer(true);
      }}
    >
      <img className="player-btn__img" src={musicDiskGif} alt="" />
    </div>
  );
}
