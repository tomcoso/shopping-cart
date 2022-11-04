import { createReducer } from "@reduxjs/toolkit";

const cartDisplayReducer = createReducer(false, (builder) => {
  builder.addCase("toggle", (state, action) => {
    return !state;
  });
});

export default cartDisplayReducer;
