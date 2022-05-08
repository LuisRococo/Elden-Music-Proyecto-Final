import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSingers } from "../../util/requests";
import EmptyResults from "../EmptyResults";
import EmptyMessageCard from "../general/EmptyMessageCard";
import ItemCard, { ItemCardContainer } from "../general/ItemCard";
import SectionDivisor from "./SectionDivisor";
import concertImg from "../../img/concert-1.jpeg";

export default function HomeArtistSection() {
  const limitsingers = 3;
  const [singers, setSingers] = useState([]);

  async function loadSingers() {
    try {
      const res = await fetchSingers(limitsingers);
      if (res.status === 200) setSingers(await res.json());
    } catch (error) {}
  }

  useEffect(() => {
    loadSingers();
  }, []);

  return (
    <Box sx={{ paddingY: "7%" }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "primary" }}>
        <SectionDivisor title="Singers" />

        {singers.length !== 0 && (
          <ItemCardContainer>
            <Grid item xs={12} md={6}>
              <Grid container rowSpacing={3} columnSpacing={3}>
                {singers.map((singer, key) => {
                  return (
                    <ItemCard
                      title={singer.singer_name}
                      detail={singer.stage_name}
                      idImage={singer.id_image}
                      url={""}
                      key={`home-artist-sec-artists-${key}`}
                      gridXS={12}
                      gridMD={12}
                    />
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={6} md={6} display={{ xs: "none", md: "block" }}>
              <BigImageLink
                text="Explore more arists"
                background={concertImg}
                url={""}
              />
            </Grid>
          </ItemCardContainer>
        )}

        {singers.length === 0 && <EmptyMessageCard />}
      </Container>
    </Box>
  );
}

export function BigImageLink({ text, url, background }) {
  return (
    <Link to={url} style={{ textDecoration: "none" }}>
      <div
        className="big-img-link"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="big-img-link__content">
          <p className="big-img-link__text">{text}</p>
          <Button variant="contained">See more</Button>
        </div>
      </div>
    </Link>
  );
}
