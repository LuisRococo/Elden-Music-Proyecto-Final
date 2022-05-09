import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminItemParent from "../components/admin/AdminItemParent";
import AdminForm from "../components/admin/AdminForm";
import AdminItem from "../components/admin/AdminItem";
import SectionHeader from "../components/general/SectionHeader";
import UploadButton from "../components/general/UploadButton";
import {
  fetchAlbums,
  requestCreateAlbums,
  requestCreateSong,
} from "../util/requests";
import AdminElementHeader from "../components/admin/AdminElementHeader";
import { showError, showSuccess } from "../redux/reducers/errorReducer";
import { toBase64 } from "../util/other";

export default function AdminAlbumPage() {
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState(null);
  const [formCreateValues, setFormCreateValues] = useState(
    getCreateFormSongClear()
  );
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  function getCreateFormSongClear() {
    return {
      songName: "",
      duration: "",
      previewSongFile: null,
      songFile: null,
      idAlbum: "",
    };
  }

  function updateSongFile(e) {
    changeFormCreateValues("songFile", e.target.files[0]);
    console.info(formCreateValues.songFile);
  }

  function updatePreviewSongFile(e) {
    changeFormCreateValues("previewSongFile", e.target.files[0]);
    console.info(formCreateValues.previewSongFile);
  }

  function incrustAlbumSongs(songs, album) {
    return songs.map((song, index) => {
      return (
        <AdminItem
          idImage={album.id_image}
          idItem={song.id_song}
          key={`album-song-x-${index}`}
          title={song.song_name}
          squareImage={false}
        />
      );
    });
  }

  function showCreateSongForm(idAlbum) {
    for (let index = 0; index < albums.length; index++) {
      const album = albums[index];
      if (album.id_album === idAlbum) {
        setSelectedAlbum(album);
        changeFormCreateValues("idAlbum", album.id_album);
        return;
      }
    }
  }

  async function getAlbums() {
    try {
      const res = await fetchAlbums();

      if (res.status === 200) {
        setAlbums(await res.json());
      }
    } catch (error) {}
  }

  function changeFormCreateValues(fieldName, value) {
    setFormCreateValues({ ...formCreateValues, [fieldName]: value });
  }

  async function createSong(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();

      const songPreview64 = await toBase64(formCreateValues.previewSongFile);
      const song64 = await toBase64(formCreateValues.songFile);
      const res = await requestCreateSong(
        formCreateValues.songName,
        formCreateValues.duration,
        songPreview64,
        song64,
        formCreateValues.idAlbum
      );

      if (res.status === 200) {
        dispatch(showSuccess("song created"));
        getAlbums();
        setFormCreateValues(getCreateFormSongClear());
        setSelectedAlbum(null);
      } else {
        dispatch(showError("Error, check your values"));
      }
    } catch (error) {
      dispatch(showError("Error, check your values"));
    }
  }

  //USE EFFECTS
  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div>
      <SectionHeader title={"SONGS"} />
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        {selectedAlbum && (
          <AdminElementHeader
            idImage={selectedAlbum.id_image}
            title={selectedAlbum.album_name}
          />
        )}
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {selectedAlbum && (
            <AdminForm title="Create Song">
              <form
                onSubmit={(e) => {
                  createSong(e);
                }}
              >
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Song Name"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        changeFormCreateValues("songName", e.target.value);
                      }}
                      value={formCreateValues.songName}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Duration (Minutes)"
                      variant="outlined"
                      required={true}
                      type={"number"}
                      onChange={(e) => {
                        changeFormCreateValues("duration", e.target.value);
                      }}
                      value={formCreateValues.duration}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <UploadButton
                      name="create-song-file"
                      updateFile={updateSongFile}
                      title="Upload Song"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <UploadButton
                      name="create-preview-song-file"
                      updateFile={updatePreviewSongFile}
                      title="Upload Preview Song"
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
          )}
        </Grid>

        <Box sx={{ marginTop: "50px" }}>
          {albums && albums.length !== 0 ? (
            <>
              {albums.map((album, key) => {
                return (
                  <>
                    <AdminItemParent
                      key={`album-item-parent-${key}`}
                      addItem={showCreateSongForm}
                      title={album.album_name}
                      desc={album.release_date}
                      idImage={album.id_image}
                      idItem={album.id_album}
                      squareImage={true}
                    />

                    {incrustAlbumSongs(album.Songs, album)}
                  </>
                );
              })}
            </>
          ) : (
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              "There are no albums nor songs"
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}
