import { Box, Typography } from "@mui/material";
import React from "react";
import notFoundImg from "../img/404-img.png";

export default function EmptyResults() {
  return (
    <div className="empty-res">
      <img src={notFoundImg} alt="" />
      <div>
        <p className="empty-res__title">Results not found</p>
        <p className="empty-res__second">Try it later</p>
      </div>
    </div>
  );
}
