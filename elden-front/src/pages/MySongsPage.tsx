import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmptyResults from "../components/EmptyResults";
import SectionHeader from "../components/general/SectionHeader";
import UserSong from "../components/general/UserSong";
import { fetchUserSongs } from "../util/requests";

export default function MySongsPage() {
  const [songs, setSongs] = useState([]);

  async function getSongs() {
    try {
      const res = await fetchUserSongs();

      if (res.status === 200) setSongs(await res.json());
    } catch (error) {}
  }

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f0f0f0" }}>
      <SectionHeader title={"My Songs"} />
      <Container maxWidth={"lg"} sx={{ minWidth: "100vh", paddingY: "6%" }}>
        {songs.length === 0 && <EmptyResults />}

        {songs.length !== 0 && (
          <>
            {songs.map((song, key) => {
              return (
                <Box sx={{ marginY: "10px" }} key={`user-song-${key}`}>
                  <UserSong
                    idSong={song.Song.id_song}
                    idImage={song.Song.Album.id_image}
                    singerName={song.Song.Album.Singer.singer_name}
                    songName={song.Song.song_name}
                  />
                </Box>
              );
            })}
          </>
        )}
      </Container>
    </Box>
  );
}
