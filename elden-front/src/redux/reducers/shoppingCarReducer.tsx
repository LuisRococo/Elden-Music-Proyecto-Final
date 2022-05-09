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
      if (doesItemAlreadyExists(state.shoppingCar, idItem, true)) {
        state.shoppingCar.push(createShopItem(idItem, true, isVirtual));
        localStorage.setItem("shoppingCar", state.shoppingCar);
      }
    },
    addAlbum: (state, action: PayloadAction<any>) => {
      const idItem = action.payload.idItem;
      const isVirtual = action.payload.isVirtual;
      if (doesItemAlreadyExists(state.shoppingCar, idItem, false))
        state.shoppingCar.push(createShopItem(idItem, false, isVirtual));
      localStorage.setItem("shoppingCar", state.shoppingCar);
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const idItem = action.payload.idItem;
      const isSong = action.payload.isSong;

      for (let index = 0; index < state.shoppingCar.length; index++) {
        const car = state.shoppingCar[index];
        if (car.isSong === isSong && car.idSong === idItem) {
          state.shoppingCar.splice(index, 1);
          localStorage.setItem("shoppingCar", state.shoppingCar);
        }
      }
    },
    deleteAll: (state) => {
      state.shoppingCar = [];
      localStorage.setItem("shoppingCar", state.shoppingCar);
    },
  },
});

function createShopItem(idItem, isSong, isVirtual) {
  return { idItem, isSong, isVirtual };
}

// Action creators are generated for each case reducer function
export const { deleteAll } = shoppingCarSlice.actions;

export default shoppingCarSlice.reducer;
