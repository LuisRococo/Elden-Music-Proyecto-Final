import React from "react";
import { useDispatch, useSelector } from "react-redux";
import musicDiskGif from "../../../img/music-disk.gif";
import { expandPlayer } from "../../../redux/reducers/playerReducer";
import { RootState } from "../../../redux/store";

export default function PlayerBtn() {
  const player = useSelector((state: RootState) => state.player.player);
  const dispatch = useDispatch();
  return (
    <div
      className={"player-btn " + (player.other.expanded ? "hidden" : "")}
      onClick={() => {
        dispatch(expandPlayer());
      }}
    >
      <img className="player-btn__img" src={musicDiskGif} alt="" />
    </div>
  );
}
