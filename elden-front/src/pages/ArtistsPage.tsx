import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import EmptyResults from "../components/EmptyResults";
import ItemCard, { ItemCardContainer } from "../components/general/ItemCard";
import SectionHeader from "../components/general/SectionHeader";
import { fetchSingers } from "../util/requests";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  async function getArtists() {
    try {
      const res = await fetchSingers();
      if (res.status === 200) setArtists(await res.json());
    } catch (error) {}
  }

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <SectionHeader title={"Artists"} />
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "primary", paddingY: "7%" }}
      >
        {artists.length !== 0 && (
          <ItemCardContainer>
            {artists.map((artist, key) => {
              return (
                <ItemCard
                  title={artist.singer_name}
                  detail={`Albums Quantity: ${artist.Albums.length}`}
                  url={`/artist/${artist.id_singer}`}
                  idImage={artist.id_image}
                  key={`song-sec-item-${key}`}
                  isSquare={false}
                />
              );
            })}
          </ItemCardContainer>
        )}

        {artists.length === 0 && <EmptyResults />}
      </Container>
    </Box>
  );
}
