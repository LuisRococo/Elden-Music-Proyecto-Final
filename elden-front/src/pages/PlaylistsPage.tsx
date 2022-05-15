import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionHeader from "../components/general/SectionHeader";
import UserSong from "../components/general/UserSong";
import PlaylistController from "../components/playlists/PlaylistController";
import PlaylistHeader from "../components/playlists/PlaylistHeader";
import PlaylistSong from "../components/playlists/PlaylistSong";
import { fetchUserPlaylists } from "../util/requests";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [addSongInfo, setAddSongInfo] = useState(null);

  async function getPlaylists() {
    try {
      const res = await fetchUserPlaylists();
      // console.info(await res.json());
      if (res.status === 200) setPlaylists(await res.json());
    } catch (error) {}
  }

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#ededed" }}>
      <SectionHeader title={"My Playlists"} />
      <Container maxWidth={"lg"} sx={{ minHeight: "100vh", paddingY: "6%" }}>
        <PlaylistController
          onAddSong={getPlaylists}
          onCreate={getPlaylists}
          addSongToplayListInfo={addSongInfo}
        />
        {playlists.length !== 0 && (
          <Box sx={{ marginTop: "7%" }}>
            <Box>
              {playlists.map((playlist, key) => {
                return (
                  <Box key={`playlist-${key}`} sx={{ marginBottom: "20px" }}>
                    <PlaylistHeader
                      setAddSongInfo={setAddSongInfo}
                      addSongInfo={addSongInfo}
                      onDelete={getPlaylists}
                      idPlaylist={playlist.id_playlist}
                      playlistName={playlist.playlist_name}
                    />
                    {playlist.PlaylistSongs.map((song, key) => {
                      return (
                        <Box sx={{ marginY: "7px" }} key={`song-${key}`}>
                          <PlaylistSong
                            onDelete={getPlaylists}
                            idImage={song.Song.Album.id_image}
                            idSong={song.Song.id_song}
                            idPlaylist={playlist.id_playlist}
                            singerName={song.Song.Album.Singer.singer_name}
                            songName={song.Song.song_name}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
