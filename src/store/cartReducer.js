import { createReducer } from "@reduxjs/toolkit";

const cartReducer = createReducer([], (builder) => {
  builder
    .addCase("add", (state, action) => {
      let done = false;
      for (let each of state) {
        if (each.id === action.payload.id) {
          done = true;
          each.amount += action.payload.amount;
        }
      }
      if (!done) state.push(action.payload);
    })
    .addCase("remove", (state, action) => {
      for (let each of state) {
        if (each.id === action.payload.id) {
          each.amount -= action.payload.amount;
        }
      }
      state.filter((item) => {
        if (item.amount > 0) return item;
        return null;
      });
    })
    .addCase("clear", (state, action) => {
      state = [];
    });
});

export default cartReducer;
