import { Button, Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AlbumIcon from "@mui/icons-material/Album";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { fetchFileBase64 } from "../../util/requests";

export default function AlbumHeader({
  idImage,
  albumName,
  singerName,
  isVirtual,
  isSingle,
  price,
  toggleVirtual,
}) {
  const [image, setImage] = useState(null);

  async function getImage() {
    const res = await fetchFileBase64(idImage);
    if (res.status === 200) {
      setImage((await res.json()).file_content);
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="album-hd">
      <Container maxWidth="lg">
        <div className="album-hd-content">
          {image && <img src={image} alt="" />}
          <div className="album-hd__data">
            <h2 className="album-hd__title">{albumName}</h2>
            <p className="album-hd__artist">{singerName}</p>
            <Divider sx={{ backgroundColor: "white", marginY: "20px" }} />

            <div className="album-hd__main">
              <div className="album-hd__main-data">
                <div className="album-hd__main-data-item">
                  <AlbumIcon />
                  <p>{isVirtual ? "Virtual" : "Physical"}</p>
                </div>
                <div className="album-hd__main-data-item">
                  <AutoAwesomeMotionIcon />
                  <p>{isSingle ? "Single" : "No single"}</p>
                </div>
              </div>
              <div>
                {!isSingle && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginX: "5px" }}
                    onClick={toggleVirtual}
                  >
                    {isVirtual ? "See Physical" : "see Virtual"}
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginX: "5px" }}
                >
                  Comprar ${price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
