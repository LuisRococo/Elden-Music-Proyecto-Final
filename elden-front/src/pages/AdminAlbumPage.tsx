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
import AdminArtistHeader from "../components/admin/AdminArtistHeader";
import AdminForm from "../components/admin/AdminForm";
import AdminItem from "../components/admin/AdminItem";
import SectionHeader from "../components/general/SectionHeader";
import UploadButton from "../components/general/UploadButton";
import { RootState } from "../redux/store";
import { fetchAlbums, fetchSingers } from "../util/requests";

export default function AdminAlbumPage() {
  const dispatch = useDispatch();
  const token: any = useSelector((status: RootState) => status.token.token);
  const [singers, setSingers] = useState(null);
  const [formCreateValues, setFormCreateValues] = useState(
    getCreateFormAlbumClear()
  );

  function getCreateFormAlbumClear() {
    return {
      albumName: "",
      releaseDate: "",
      isSingle: "",
      idSinger: "",
      imageFile: null,
    };
  }

  function updateFile(e) {
    changeFormCreateValues("imageFile", e.target.files[0]);
  }

  function incrustSingerAlbums(albums) {
    return albums.map((album, index) => {
      return (
        <AdminItem
          idImage={album.id_image}
          idItem={album.id_album}
          key={`singer-album-${index}`}
          title={album.album_name}
        />
      );
    });
  }

  async function getSingers() {
    try {
      const res = await fetchSingers();

      if (res.status === 200) {
        setSingers(await res.json());
      }
    } catch (error) {}
  }

  function changeFormCreateValues(fieldName, value) {
    setFormCreateValues({ ...formCreateValues, [fieldName]: value });
    console.info(formCreateValues);
  }

  async function createAlbum(e) {
    try {
    } catch (error) {}
  }

  //USE EFFECTS
  useEffect(() => {
    getSingers();
  }, []);

  return (
    <div>
      <SectionHeader title={"ALBUMS"} />
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <AdminForm title="Create Album">
            <form
              onSubmit={(e) => {
                createAlbum(e);
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
                    label="Album Name"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                      changeFormCreateValues("albumName", e.target.value);
                    }}
                    value={formCreateValues.albumName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Release Date"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                      changeFormCreateValues("releaseDate", e.target.value);
                    }}
                    value={formCreateValues.releaseDate}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <UploadButton
                    name="create-input-img"
                    updateFile={updateFile}
                    title="Upload Image"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        onChange={(e) => {
                          changeFormCreateValues("isSingle", e.target.checked);
                        }}
                      />
                    }
                    label="Jason Killian"
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
        </Grid>

        <Box sx={{ marginTop: "50px" }}>
          {singers && singers.length !== 0 ? (
            <>
              {singers.map((singer, key) => {
                return (
                  <>
                    <AdminArtistHeader
                      name={singer.singer_name}
                      stageName={singer.stage_name}
                      idImage={singer.id_image}
                    />

                    {incrustSingerAlbums(singer.Albums)}
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
              "There are no artists nor albums"
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}
