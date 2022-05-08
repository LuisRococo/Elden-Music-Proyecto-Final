import React from "react";
import HomeArtistSection from "../components/home/HomeArtistSection";
import HomeSongsSection from "../components/home/HomeSongsSection";
import LandPage from "../components/home/LandPage";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <LandPage />
      <HomeSongsSection />
      <HomeArtistSection />
    </div>
  );
}
