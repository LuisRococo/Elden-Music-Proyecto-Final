import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "../components/general/SectionHeader";
import UploadButton from "../components/general/UploadButton";
import { showError, showSuccess } from "../redux/reducers/errorReducer";
import { RootState } from "../redux/store";
import { toBase64 } from "../util/other";
import { requestCreateSinger } from "../util/requests";

export default function AdminArtistPage() {
  const [file, setFile] = useState();
  const [artistName, setArtistName] = useState("");
  const [stageName, setStageName] = useState("");
  const [artistNationality, setArtistNationality] = useState("");
  const dispatch = useDispatch();
  const token: any = useSelector((status: RootState) => status.token.token);

  function updateFile(e) {
    setFile(e.target.files[0]);
  }

  async function createSinger(e) {
    try {
      e.target.reportValidity();
      e.preventDefault();

      const base64Img = await toBase64(file);

      console.info(token);

      const res = await requestCreateSinger(
        artistName,
        stageName,
        artistNationality,
        base64Img,
        token.token
      );

      if (res.status === 200) {
        dispatch(showSuccess("Artist Registered"));
      } else {
        dispatch(showError("error - Check your data"));
      }
    } catch (error) {
      dispatch(showError("Unexpected error - Try later"));
    }
  }

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

        <Divider sx={{ marginY: "20px" }} />
      </Container>
    </div>
  );
}
