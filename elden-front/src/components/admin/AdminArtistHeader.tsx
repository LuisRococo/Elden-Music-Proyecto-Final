import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFileBase64 } from "../../util/requests";

export default function AdminArtistHeader({ name, stageName, idImage }) {
  const [image64, setImage64] = useState(null);
  async function getImage() {
    const res = await fetchFileBase64(idImage);
    if (res.status === 200) setImage64((await res.json()).file_content);
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      <div className="artist-hd">
        {image64 && <img src={image64} alt="artist image" />}
        <div className="artist-hd__info">
          <p className="artist-hd__name">{name}</p>
          <p className="artist-hd__stage-name">{stageName}</p>
        </div>
      </div>
      <Divider sx={{ marginY: "10px" }} />
    </>
  );
}
