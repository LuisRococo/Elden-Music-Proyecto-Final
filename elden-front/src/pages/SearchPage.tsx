import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import ItemCard from "../components/general/ItemCard";
import SectionDivisor from "../components/general/SectionDivisor";
import CompleteSearchBar from "../components/Search/CompleteSearchBar";

export default function SearchPage() {
  const [results, setResults] = useState(null);
  return (
    <Box sx={{ backgroundColor: "#ededed" }}>
      <CompleteSearchBar setResults={setResults} />
      <Container maxWidth={"lg"} sx={{ paddingY: "6%", minHeight: "100vh" }}>
        {results !== null && results.albums.length !== 0 && (
          <>
            <SectionDivisor title={"Albums"} />
            {results.albums.map((album, key) => {
              return (
                <Box sx={{ marginY: "7px" }} key={`album-${key}`}>
                  <ItemCard
                    idImage={album.id_image}
                    detail={album.Singer.singer_name}
                    title={album.album_name}
                    url={`/album/${album.id_album}`}
                    isSquare={true}
                  />
                </Box>
              );
            })}
          </>
        )}

        {results !== null && results.songs.length !== 0 && (
          <Box sx={{ marginTop: "50px" }}>
            <SectionDivisor title={"Songs"} />
            {results.songs.map((song, key) => {
              return (
                <Box sx={{ marginY: "7px" }} key={`song-${key}`}>
                  <ItemCard
                    idImage={song.Album.id_image}
                    detail={song.Album.Singer.singer_name}
                    title={song.Album.album_name}
                    url={`/song/${song.Album.id_song}`}
                    isSquare={false}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
