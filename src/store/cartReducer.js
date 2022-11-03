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
    .addCase("set", (state, action) => {
      const pl = action.payload;
      state.find((x) => x.id === pl.id).amount = pl.amount;
    })
    .addCase("clear", (state, action) => {
      return [];
    })
    .addCase("clean", (state, action) => {
      return state.filter((x) => x.amount > 0);
    });
});

export default cartReducer;
