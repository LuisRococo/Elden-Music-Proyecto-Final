import { Button, Divider, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFileBase64 } from "../../util/requests";

export default function ItemCard({
  title,
  detail,
  idImage,
  url,
  isSquare = false,
}) {
  const [image64, setImage64] = useState(null);

  async function getImage64() {
    try {
      const res = await fetchFileBase64(idImage);
      if (res.status === 200) {
        const resImg = await res.json();
        setImage64(resImg.file_content);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getImage64();
  }, []);

  return (
    <Grid item xs={12} md={6}>
      <Link to={url} style={{ textDecoration: "none" }}>
        <Paper sx={{ padding: "15px" }} elevation={8}>
          <div className="item-card">
            <div className="item-card__img-cont">
              {image64 && (
                <img
                  className={isSquare ? "item-card__img-cont--square-img" : ""}
                  src={image64}
                  alt=""
                />
              )}
            </div>
            <div className="item-card__info-cont">
              <p className="item-card__name">{title}</p>
              <p className="item-card__detail">{detail}</p>
              <Divider sx={{ marginY: "15px" }} />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button>Ver mas</Button>
              </Box>
            </div>
          </div>
        </Paper>
      </Link>
    </Grid>
  );
}

export function ItemCardContainer({ children }) {
  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {children}
    </Grid>
  );
}
