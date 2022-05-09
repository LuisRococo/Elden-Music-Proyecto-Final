import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlbumHeader from "../components/albumStore/AlbumHeader";
import { fetchAlbum } from "../util/requests";

export default function AlbumPage() {
  const [album, setAlbum] = useState(null);
  const { idAlbum } = useParams();
  const navigate = useNavigate();

  async function getAlbum() {
    try {
      const res = await fetchAlbum(idAlbum);
      if (res.status === 200) {
        const resObj = await res.json();
        if (resObj) {
          setAlbum(resObj);
          return;
        }
      }
    } catch (error) {}
    navigate("/");
  }

  useEffect(() => {
    getAlbum();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {album && (
        <>
          <AlbumHeader />
          <Container>
            <p></p>
          </Container>
        </>
      )}
    </Box>
  );
}
