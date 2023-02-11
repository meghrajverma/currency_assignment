/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: { base_code: "USD", rates: {}, currency_dropdown: [] },
};

const currencyDropdown = (data) => {
  let drop = [];
  const givenList = Object.fromEntries(
    Object.entries(data?.rates).slice(1, 11)
  );
  for (const prop in givenList) {
    let col = {
      value: `${givenList[prop]}`,
      label: `${prop}`,
      key: `${givenList[prop]}${prop}`,
    };
    drop.push(col);
  }
  return drop;
};

export const currencySlice = createSlice({
  initialState,
  name: "currencySlice",
  reducers: {
    setCurrencyList: (state, action) => {
      let list = currencyDropdown(action?.payload);
      state.currency = {
        base_code: action.payload?.base_code,
        rates: action.payload?.rates,
        currency_dropdown: list,
      };
    },
  },
});

export default currencySlice.reducer;

export const { setCurrencyList } = currencySlice.actions;
