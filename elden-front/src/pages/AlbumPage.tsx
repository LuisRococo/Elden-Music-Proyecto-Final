import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlbumHeader from "../components/albumStore/AlbumHeader";
import SongItem from "../components/albumStore/SongItem";
import EmptyResults from "../components/EmptyResults";
import ItemCard, { ItemCardContainer } from "../components/general/ItemCard";
import SectionDivisor from "../components/general/SectionDivisor";
import { fetchAlbum } from "../util/requests";

export default function AlbumPage() {
  const [album, setAlbum] = useState(null);
  const { idAlbum } = useParams();
  const navigate = useNavigate();
  const [virtual, setVirtual] = useState(true);

  function toggleVirtual() {
    setVirtual(!virtual);
  }

  async function getAlbum() {
    try {
      const res = await fetchAlbum(idAlbum);
      if (res.status === 200) {
        const resObj = await res.json();
        if (resObj) {
          setAlbum(resObj);
          if (resObj.is_single) {
            setVirtual(false);
          }
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      {album && (
        <>
          <AlbumHeader
            idImage={album.id_image}
            isSingle={album.is_single}
            isVirtual={virtual}
            albumName={album.album_name}
            singerName={album.Singer.singer_name}
            toggleVirtual={toggleVirtual}
            price={virtual ? album.price_album_digital : album.price_album}
          />
          <Container maxWidth={"lg"} sx={{ paddingY: "5%" }}>
            <SectionDivisor title="Songs" url={null} />

            {album.Songs.length !== 0 && (
              <>
                {album.Songs.map((song, key) => {
                  return (
                    <SongItem
                      singerName={album.Singer.singer_name}
                      idSong={song.id_song}
                      nameSong={song.song_name}
                      duration={song.duration}
                      key={`album-song-${key}`}
                      idImage={album.id_image}
                    />
                  );
                })}
              </>
            )}

            {album.Songs.length === 0 && <EmptyResults />}
          </Container>
        </>
      )}
    </Box>
  );
}
