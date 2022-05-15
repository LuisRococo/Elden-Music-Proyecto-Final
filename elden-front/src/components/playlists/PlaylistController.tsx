import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../redux/reducers/errorReducer";
import {
  fetchUserSongs,
  requestAddSongToPlaylist,
  requestCreatePlaylist,
} from "../../util/requests";
import AdminForm from "../admin/AdminForm";

export default function PlaylistController({
  onCreate = null,
  onAddSong,
  addSongToplayListInfo,
}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [songToAdd, setSongToAdd] = useState("");

  async function getUserSongs() {
    try {
      const res = await fetchUserSongs();
      if (res.status === 200) setSongs(await res.json());
    } catch (error) {}
  }

  async function addSongToPlaylist(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();
      const res = await requestAddSongToPlaylist(
        addSongToplayListInfo.id,
        songToAdd
      );
      if (res.status === 200) {
        setName("");
        dispatch(showSuccess("Song added to playlist"));
        onAddSong();
      } else {
        dispatch(showError("Something bad happened"));
      }
    } catch (error) {
      dispatch(showError(`Error - ${error}`));
    }
  }

  async function createPlaylist(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();
      const res = await requestCreatePlaylist(name);
      if (res.status === 200) {
        setName("");
        dispatch(showSuccess("Playlist Created"));
        onCreate();
      } else {
        dispatch(showError("Something bad happened"));
      }
    } catch (error) {
      dispatch(showError(`Error - ${error}`));
    }
  }

  useEffect(() => {
    getUserSongs();
  }, []);

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <AdminForm title="Create Playlist">
        <form
          onSubmit={(e) => {
            createPlaylist(e);
          }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={12}>
              <TextField
                sx={{ width: "100%" }}
                label="Playlist Name"
                variant="outlined"
                required={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            sx={{ marginTop: "30px", marginRight: "auto", width: "100%" }}
          >
            Create
          </Button>
        </form>
      </AdminForm>

      {addSongToplayListInfo && (
        <AdminForm title="Add to Playlist">
          <form
            onSubmit={(e) => {
              addSongToPlaylist(e);
            }}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Box
                sx={{
                  padding: "15px 30px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Typography>Add songs to</Typography>
                <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
                  {addSongToplayListInfo.name}
                </Typography>
              </Box>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Song to add
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={songToAdd}
                    label="Song to add"
                    onChange={(e) => {
                      setSongToAdd(e.target.value);
                    }}
                    required={true}
                  >
                    {songs.map((song, key) => {
                      return (
                        <MenuItem
                          key={`form-playlist-song-${key}`}
                          value={song.id_song}
                        >
                          {song.Song.song_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              sx={{ marginTop: "30px", marginRight: "auto", width: "100%" }}
            >
              Add Song
            </Button>
          </form>
        </AdminForm>
      )}
    </Grid>
  );
}
