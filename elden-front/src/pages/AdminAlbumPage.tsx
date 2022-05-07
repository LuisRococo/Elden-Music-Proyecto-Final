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
import { RootState } from "../redux/store";
import {
  fetchAlbums,
  fetchSingers,
  requestCreateAlbums,
} from "../util/requests";
import AdminElementHeader from "../components/admin/AdminElementHeader";
import { showError, showSuccess } from "../redux/reducers/errorReducer";
import { toBase64 } from "../util/other";

export default function AdminAlbumPage() {
  const dispatch = useDispatch();
  const token: any = useSelector((status: RootState) => status.token.token);
  const [singers, setSingers] = useState(null);
  const [formCreateValues, setFormCreateValues] = useState(
    getCreateFormAlbumClear()
  );
  const [selectedArtist, setSelectedArtist] = useState(null);

  function getCreateFormAlbumClear() {
    return {
      albumName: "",
      releaseDate: "",
      isSingle: "",
      idSinger: "",
      imageFile: null,
      priceSong: "",
      priceAlbum: "",
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
          squareImage={true}
        />
      );
    });
  }

  function showCreateAlbumForm(idArtist) {
    for (let index = 0; index < singers.length; index++) {
      const singer = singers[index];
      if (singer.id_singer === idArtist) {
        setSelectedArtist(singer);
        changeFormCreateValues("idSinger", singer.id_singer);
        return;
      }
    }
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
      e.target.reportValidity();
      e.preventDefault();

      const base64Img = await toBase64(formCreateValues.imageFile);
      const res = await requestCreateAlbums(
        formCreateValues.albumName,
        formCreateValues.releaseDate,
        formCreateValues.isSingle,
        formCreateValues.idSinger,
        base64Img,
        formCreateValues.priceAlbum,
        formCreateValues.priceSong
      );

      if (res.status === 200) {
        dispatch(showSuccess("Album created"));
        getSingers();
        setFormCreateValues(getCreateFormAlbumClear());
      }
    } catch (error) {
      dispatch(showError("Error, check your values"));
    }
  }

  //USE EFFECTS
  useEffect(() => {
    getSingers();
  }, []);

  return (
    <div>
      <SectionHeader title={"ALBUMS"} />
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        {selectedArtist && (
          <AdminElementHeader
            idImage={selectedArtist.id_image}
            title={selectedArtist.singer_name}
          />
        )}
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {selectedArtist && (
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
                      type={"date"}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                            changeFormCreateValues(
                              "isSingle",
                              e.target.checked
                            );
                          }}
                        />
                      }
                      label="Is Single"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Price Album"
                      variant="outlined"
                      required={true}
                      type={"number"}
                      InputProps={{
                        inputProps: {
                          max: 2000,
                          min: 0,
                          step: 0.01,
                        },
                      }}
                      onChange={(e) => {
                        changeFormCreateValues("priceAlbum", e.target.value);
                      }}
                      value={formCreateValues.priceAlbum}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Price Album"
                      variant="outlined"
                      required={true}
                      type={"number"}
                      InputProps={{
                        inputProps: {
                          max: 2000,
                          min: 0,
                          step: 0.01,
                        },
                      }}
                      onChange={(e) => {
                        changeFormCreateValues("priceSong", e.target.value);
                      }}
                      value={formCreateValues.priceSong}
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
          {singers && singers.length !== 0 ? (
            <>
              {singers.map((singer, key) => {
                return (
                  <>
                    <AdminItemParent
                      key={`item-parent-${key}`}
                      addItem={showCreateAlbumForm}
                      title={singer.singer_name}
                      desc={singer.stage_name}
                      idImage={singer.id_image}
                      idItem={singer.id_singer}
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
