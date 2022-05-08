import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSongs } from "../../util/requests";
import ItemCard, { ItemCardContainer } from "../general/ItemCard";
import SectionDivisor from "./SectionDivisor";

export default function HomeSongsSection() {
  const limitSongs = 4;
  const [songs, setSongs] = useState(null);

  async function getSongs() {
    try {
      const res = await fetchSongs(limitSongs);
      if (res.status === 200) {
        const songsFetch = await res.json();
        if (songsFetch.lenght !== 0) {
          setSongs(songsFetch);
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <Box sx={{ marginY: "5%" }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "primary" }}>
        <SectionDivisor title="Songs" />

        {songs && (
          <ItemCardContainer>
            {songs.map((song, key) => {
              return (
                <ItemCard
                  title={song.song_name}
                  detail={song.Album.album_name}
                  url={""}
                  idImage={song.Album.id_image}
                  key={`song-sec-item-${key}`}
                  isSquare={true}
                />
              );
            })}
          </ItemCardContainer>
        )}
      </Container>
    </Box>
  );
}
