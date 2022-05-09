import { Button, Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AlbumIcon from "@mui/icons-material/Album";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export default function AlbumHeader({ idAlbum }) {
  return (
    <div className="album-hd">
      <Container maxWidth="lg">
        <div className="album-hd-content">
          <img
            src="https://resources.tidal.com/images/3b2a7625/f1cc/41d8/b3f9/897cacc911b0/640x640.jpg"
            alt=""
          />
          <div className="album-hd__data">
            <h2 className="album-hd__title">Album Nombre</h2>
            <p className="album-hd__artist">Juan Alvarez</p>
            <Divider sx={{ backgroundColor: "white", marginY: "20px" }} />

            <div className="album-hd__main">
              <div className="album-hd__main-data">
                <div className="album-hd__main-data-item">
                  <AlbumIcon />
                  <p>Virtual</p>
                </div>
                <div className="album-hd__main-data-item">
                  <AutoAwesomeMotionIcon />
                  <p>Single</p>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginX: "5px" }}
                >
                  Ver Virtual
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginX: "5px" }}
                >
                  Comprar $345.24
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
