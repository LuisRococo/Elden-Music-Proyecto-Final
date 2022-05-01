import React, { useState } from "react";
import PlayerBtn from "./PlayerBtn";

export default function Player() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <PlayerBtn showPlayer={showPlayer} />
    </>
  );
}
