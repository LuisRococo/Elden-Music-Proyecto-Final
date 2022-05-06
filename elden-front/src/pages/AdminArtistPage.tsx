import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminForm from "../components/admin/AdminForm";
import AdminItem from "../components/admin/AdminItem";
import SectionHeader from "../components/general/SectionHeader";
import UploadButton from "../components/general/UploadButton";
import { showError, showSuccess } from "../redux/reducers/errorReducer";
import { RootState } from "../redux/store";
import { toBase64 } from "../util/other";
import {
  fetchSingers,
  requestCreateSinger,
  requestDeleteSinger,
  requestUpdateArtist,
} from "../util/requests";

export default function AdminArtistPage() {
  const [file, setFile] = useState();
  const [artistName, setArtistName] = useState("");
  const [stageName, setStageName] = useState("");
  const [artistNationality, setArtistNationality] = useState("");

  const [artistUpdate, setArtistUpdate] = useState(null);

  const dispatch = useDispatch();
  const token: any = useSelector((status: RootState) => status.token.token);
  const [artists, setArtists] = useState(null);

  function updateFile(e) {
    setFile(e.target.files[0]);
  }
  function updateFileUpdate(e) {
    changeUpdateValues("file", e.target.files[0]);
  }

  function cleanSingerValues() {
    setFile(null);
    setArtistName("");
    setStageName("");
    setArtistNationality("");
  }

  async function createSinger(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();

      const base64Img = await toBase64(file);

      const res = await requestCreateSinger(
        artistName,
        stageName,
        artistNationality,
        base64Img
        // token.token
      );

      if (res.status === 200) {
        cleanSingerValues();
        dispatch(showSuccess("Artist Registered"));
        getAllSingers();
      } else {
        dispatch(showError("error - Check your data"));
      }
    } catch (error) {
      dispatch(showError("Unexpected error - Try later"));
    }
  }

  async function updateSinger(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();

      const base64Img = await toBase64(artistUpdate.file);

      const res = await requestUpdateArtist(
        artistUpdate.idArtist,
        artistUpdate.artistName,
        artistUpdate.stageName,
        artistUpdate.artistNationality,
        base64Img
      );

      if (res.status === 200) {
        getAllSingers();
        dispatch(showSuccess("Artist Updated"));
        setArtistUpdate(null);
      } else {
        dispatch(showError("Error - Check your data"));
      }
    } catch (error) {
      dispatch(showError("Unexpected error - Try later"));
    }
  }

  async function deleteSinger(idSinger) {
    const res = await requestDeleteSinger(idSinger);
    if (res.status === 200) {
      getAllSingers();
      dispatch(showSuccess("Artist deleted"));
    } else {
      dispatch(showError("Error - Something bad happened"));
    }
  }

  function changeUpdateValues(fieldName, value) {
    setArtistUpdate({ ...artistUpdate, [fieldName]: value });
  }

  async function getAllSingers() {
    const res = await fetchSingers();
    const jsonRes = await res.json();

    if (res.status === 200) setArtists(jsonRes);
  }

  function activateUpdateSinger(idSinger) {
    for (let index = 0; index < artists.length; index++) {
      const artist = artists[index];
      if (artist.id_singer === idSinger) {
        setArtistUpdate({
          idArtist: idSinger,
          artistNationality: artist.nationality,
          artistName: artist.singer_name,
          file: null,
          stageName: artist.stage_name,
        });
      }
    }
  }

  useEffect(() => {
    getAllSingers();
  }, []);

  return (
    <div>
      <SectionHeader title={"ARTISTS"} />
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <AdminForm title="Create Singer">
            <form
              onSubmit={(e) => {
                createSinger(e);
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
                    label="Singer Name"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                      setArtistName(e.target.value);
                    }}
                    value={artistName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Stage Name"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                      setStageName(e.target.value);
                    }}
                    value={stageName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Nationality"
                    variant="outlined"
                    required={true}
                    onChange={(e) => {
                      setArtistNationality(e.target.value);
                    }}
                    value={artistNationality}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <UploadButton
                    name="create-input-img"
                    updateFile={updateFile}
                    title="Upload Image"
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

          {artistUpdate && (
            <AdminForm title="Update Singer">
              <form
                onSubmit={(e) => {
                  updateSinger(e);
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
                      label="Singer Name"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        changeUpdateValues("artistName", e.target.value);
                      }}
                      value={artistUpdate.artistName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Stage Name"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        changeUpdateValues("stageName", e.target.value);
                      }}
                      value={artistUpdate.stageName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Nationality"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        changeUpdateValues("artistNationality", e.target.value);
                      }}
                      value={artistUpdate.artistNationality}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <UploadButton
                      name="update-input-img"
                      updateFile={updateFileUpdate}
                      title="Upload Image"
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  sx={{ marginTop: "30px", marginRight: "auto", width: "100%" }}
                >
                  Update
                </Button>
              </form>
            </AdminForm>
          )}
        </Grid>

        <Divider sx={{ marginY: "40px" }} />

        {artists && artists.length !== 0 ? (
          <>
            {artists.map((artist, key) => {
              return (
                <AdminItem
                  key={`admin-items-${key}`}
                  idImage={artist.id_image}
                  title={artist.singer_name}
                  deleteItem={deleteSinger}
                  idItem={artist.id_singer}
                  updateItem={activateUpdateSinger}
                />
              );
            })}
          </>
        ) : (
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.4rem", textAlign: "center" }}
          >
            "There are no artists"
          </Typography>
        )}
      </Container>
    </div>
  );
}
