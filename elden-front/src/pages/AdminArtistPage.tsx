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
} from "../util/requests";

export default function AdminArtistPage() {
  const [file, setFile] = useState();
  const [artistName, setArtistName] = useState("");
  const [stageName, setStageName] = useState("");
  const [artistNationality, setArtistNationality] = useState("");
  const dispatch = useDispatch();
  const token: any = useSelector((status: RootState) => status.token.token);
  const [artists, setArtists] = useState(null);

  function updateFile(e) {
    setFile(e.target.files[0]);
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
        base64Img,
        token.token
      );

      if (res.status === 200) {
        dispatch(showSuccess("Artist Registered"));
        getAllSingers();
      } else {
        dispatch(showError("error - Check your data"));
      }
    } catch (error) {
      dispatch(showError("Unexpected error - Try later"));
    }
  }

  async function deleteSinger(idSinger) {
    const res = await requestDeleteSinger(idSinger, token.token);
    if (res.status === 200) {
      getAllSingers();
      dispatch(showSuccess("Artist deleted"));
    } else {
      dispatch(showError("Error - Something bad happened"));
    }
  }

  async function getAllSingers() {
    const res = await fetchSingers();
    const jsonRes = await res.json();

    if (res.status === 200) setArtists(jsonRes);
  }

  useEffect(() => {
    getAllSingers();
  }, []);

  return (
    <div>
      <SectionHeader title={"ARTISTS"} />
      <Container maxWidth="lg" sx={{ paddingY: "60px" }}>
        <Paper
          elevation={7}
          sx={{
            marginTop: "10px",
            padding: "30px",
            maxWidth: "450px",
            marginX: "auto",
          }}
        >
          <Typography textAlign={"center"} variant="h3">
            Create Artist
          </Typography>
          <Divider sx={{ marginY: "30px" }} />

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
                <UploadButton updateFile={updateFile} title="Upload Image" />
              </Grid>
            </Grid>

            <Button
              type="submit"
              sx={{ marginTop: "30px", marginRight: "auto", width: "100%" }}
            >
              Create
            </Button>
          </form>
        </Paper>

        <Divider sx={{ marginY: "40px" }} />

        {artists ? (
          <>
            {artists.map((artist, key) => {
              return (
                <AdminItem
                  key={`admin-items-${key}`}
                  idImage={artist.id_image}
                  title={artist.singer_name}
                  deleteItem={deleteSinger}
                  idItem={artist.id_singer}
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
