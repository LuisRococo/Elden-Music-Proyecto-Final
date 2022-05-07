import { Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFileBase64 } from "../../util/requests";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AdminItemParent({
  title,
  desc,
  idImage,
  idItem,
  addItem,
  squareImage = false,
}) {
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
        {image64 && (
          <img
            className={squareImage && "admin-element-hd--square-img"}
            src={image64}
            alt="artist image"
          />
        )}
        <div className="artist-hd__info">
          <p className="artist-hd__name">
            {title}
            <IconButton
              onClick={() => {
                addItem(idItem);
              }}
              sx={{ marginLeft: "10px" }}
              aria-label="delete"
              size="small"
            >
              <AddCircleIcon color="secondary" fontSize="large" />
            </IconButton>
          </p>
          <p className="artist-hd__stage-name">{desc}</p>
        </div>
      </div>
      <Divider sx={{ marginY: "10px" }} />
    </>
  );
}
