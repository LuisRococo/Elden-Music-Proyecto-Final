import { Box, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFileBase64, fetchSinger, fetchTopSongs } from "../util/requests";
import { useNavigate } from "react-router-dom";
import ItemCard, { ItemCardContainer } from "../components/general/ItemCard";
import EmptyResults from "../components/EmptyResults";
import SectionDivisor from "../components/general/SectionDivisor";

export default function ArtistPage() {
  const [artist, setArtist] = useState(null);
  const [topSongs, setTopSongs] = useState([]);
  const { idArtist } = useParams();
  const navigate = useNavigate();

  async function getArtist() {
    try {
      const res = await fetchSinger(idArtist);
      if (res.status === 200) {
        const resObj = await res.json();
        if (resObj) {
          setArtist(resObj);
          return;
        }
      }
    } catch (error) {}
    navigate("/");
  }

  async function getTopSongs() {
    try {
      const res = await fetchTopSongs(idArtist);
      if (res.status === 200) setTopSongs(await res.json());
    } catch (error) {}
  }

  useEffect(() => {
    getArtist();
    getTopSongs();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {artist && (
        <ArtistPageHeader
          idImage={artist.id_image}
          name={artist.singer_name}
          stageName={artist.stage_name}
          albumsCant={artist.Albums.length}
          nationality={artist.nationality}
        />
      )}

      {artist && (
        <Container maxWidth="lg" sx={{ paddingY: "7%" }}>
          <SectionDivisor title={"Top 5 Songs"} />
          <Box sx={{ marginBottom: "40px" }}>
            {topSongs.length !== 0 && (
              <ItemCardContainer>
                {topSongs.map((song, key) => {
                  return (
                    <ItemCard
                      title={song.Song.song_name}
                      detail={song.Song.Album.album_name}
                      idImage={song.Song.Album.id_image}
                      isSquare={true}
                      url={`/album/${song.Song.Album.id_album}`}
                      key={`artist-page-top-song-${key}`}
                    />
                  );
                })}
              </ItemCardContainer>
            )}

            {topSongs.length === 0 && <EmptyResults />}
          </Box>
          <SectionDivisor title={"Albums"} />
          {artist.Albums.length !== 0 && (
            <ItemCardContainer>
              {artist.Albums.map((album, key) => {
                return (
                  <ItemCard
                    title={album.album_name}
                    detail={`Songs: ${album.Songs.length}`}
                    idImage={album.id_image}
                    isSquare={true}
                    url={`/album/${album.id_album}`}
                    key={`artist-page-album-${key}`}
                  />
                );
              })}
            </ItemCardContainer>
          )}

          {artist.Albums.length === 0 && <EmptyResults />}
        </Container>
      )}
    </Box>
  );
}

export function ArtistPageHeader({
  idImage,
  name,
  stageName,
  albumsCant,
  nationality,
}) {
  const [image, setImage] = useState(null);

  async function getImage() {
    try {
      const res = await fetchFileBase64(idImage);
      if (res.status === 200) setImage((await res.json()).file_content);
    } catch (error) {}
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="artist-pg-hd">
      <Container maxWidth="lg" sx={{ paddingY: "50px" }}>
        <div className="artist-pg-hd__cont">
          {image && <img src={image} alt="artist-image" />}
          <div className="artist-pg-hd__info">
            <h3 className="artist-pg-hd__title">{name}</h3>

            <Divider sx={{ marginY: "20px", backgroundColor: "white" }} />

            <p className="artist-pg-hd__data">
              <strong>Stage Name: </strong>
              {stageName}
            </p>
            <p className="artist-pg-hd__data">
              <strong>Albums: </strong> {albumsCant}
            </p>
            <p className="artist-pg-hd__data">
              <strong>Nationality: </strong>
              {nationality}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
