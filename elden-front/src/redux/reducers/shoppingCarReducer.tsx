import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doesItemAlreadyExists } from "../../util/other";

const shoppingCar = localStorage.getItem("shoppingCar");
const initialState = shoppingCar ? JSON.parse(shoppingCar) : [];

export const shoppingCarSlice = createSlice({
  name: "shoppingCar",
  initialState: {
    shoppingCar: initialState,
  },
  reducers: {
    addSong: (state, action: PayloadAction<any>) => {
      const idItem = action.payload.idItem;
      const isVirtual = action.payload.isVirtual;
      const price = action.payload.price;
      if (!doesItemAlreadyExists(state.shoppingCar, idItem, true)) {
        state.shoppingCar.push(createShopItem(idItem, true, isVirtual, price));
        localStorage.setItem("shoppingCar", JSON.stringify(state.shoppingCar));
      }
    },
    addAlbum: (state, action: PayloadAction<any>) => {
      const idItem = action.payload.idItem;
      const isVirtual = action.payload.isVirtual;
      const price = action.payload.price;
      if (!doesItemAlreadyExists(state.shoppingCar, idItem, false))
        state.shoppingCar.push(createShopItem(idItem, false, isVirtual, price));
      localStorage.setItem("shoppingCar", JSON.stringify(state.shoppingCar));
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const idItem = action.payload.idItem;
      const isSong = action.payload.isSong;

      for (let index = 0; index < state.shoppingCar.length; index++) {
        const car = state.shoppingCar[index];
        if (car.isSong === isSong && car.idItem === idItem) {
          state.shoppingCar.splice(index, 1);
          localStorage.setItem(
            "shoppingCar",
            JSON.stringify(state.shoppingCar)
          );
        }
      }
    },
    deleteAll: (state) => {
      state.shoppingCar = [];
      localStorage.setItem("shoppingCar", JSON.stringify(state.shoppingCar));
    },
  },
});

function createShopItem(idItem, isSong, isVirtual, price) {
  return { idItem, isSong, isVirtual, price };
}

// Action creators are generated for each case reducer function
export const { deleteAll, addSong, removeItem, addAlbum } =
  shoppingCarSlice.actions;

export default shoppingCarSlice.reducer;
