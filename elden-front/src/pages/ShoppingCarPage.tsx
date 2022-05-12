import { Container } from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyResults from "../components/EmptyResults";
import SectionDivisor from "../components/general/SectionDivisor";
import SectionHeader from "../components/general/SectionHeader";
import ShoppingItem from "../components/shoppingCar/ShoppingItem";
import TotalPriceComp from "../components/shoppingCar/TotalPriceComp";
import { RootState } from "../redux/store";

export default function ShoppingCarPage() {
  const [cantItems, setCantItems] = useState({ songs: 0, albums: 0 });
  const [totalPrice, setTotalPrice] = useState(0);
  const shoppingStore = useSelector(
    (state: RootState) => state.shoppingCar.shoppingCar
  );

  function renderSongs(items) {
    return items.map((item, key) => {
      if (item.isSong) {
        return (
          <ShoppingItem
            key={`shopping-song-${key}`}
            idItem={item.idItem}
            isSong={item.isSong}
            price={item.price}
          />
        );
      }
    });
  }

  function renderAlbums(items) {
    return items.map((item, key) => {
      if (!item.isSong) {
        return (
          <ShoppingItem
            key={`shopping-album-${key}`}
            idItem={item.idItem}
            isSong={item.isSong}
            price={item.price}
          />
        );
      }
    });
  }

  function getCantSongsInCar() {
    let cant = 0;
    shoppingStore.forEach((item) => {
      if (item.isSong) {
        cant++;
      }
    });
    cantItems.songs = cant;
    setCantItems(cantItems);
  }

  function getCantAlbumsInCar() {
    let cant = 0;
    shoppingStore.forEach((item) => {
      if (!item.isSong) {
        cant++;
      }
    });
    cantItems.albums = cant;
    setCantItems(cantItems);
  }

  function getTotalPrice() {
    let total = 0;
    shoppingStore.forEach((item) => {
      total += Number.parseFloat(item.price);
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    getTotalPrice();
    getCantAlbumsInCar();
    getCantSongsInCar();
  }, [shoppingStore]);

  useEffect(() => {
    getTotalPrice();
    getCantAlbumsInCar();
    getCantSongsInCar();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "f0f0f0" }}>
      <SectionHeader title={"Shopping Car"} />

      <Container sx={{ padding: "6%", maxWidth: "lg" }}>
        {shoppingStore.length === 0 && <EmptyResults />}

        {shoppingStore.length !== 0 && (
          <>
            <Box sx={{ marginBottom: "6%" }}>
              {cantItems.songs !== 0 && <SectionDivisor title={"Songs"} />}
              {renderSongs(shoppingStore)}
              <Box sx={{ marginY: "40px" }}></Box>
              {cantItems.albums !== 0 && <SectionDivisor title={"Albums"} />}
              {renderAlbums(shoppingStore)}
            </Box>
            <TotalPriceComp price={totalPrice} />
          </>
        )}
      </Container>
    </Box>
  );
}
