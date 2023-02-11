/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrencyList } from "../slice/currencySlice";

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://open.er-api.com/v6/" }),
  endpoints: (builder) => ({
    currency: builder.mutation({
      query: (data) => ({
        url: `latest/${data}`,
        method: "GET",
      }),
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrencyList(data));
        } catch (error) {
          console.log("error : ", error);
        }
      },

      async onCacheEntryAdded(arg, { dispatch }) {},
    }),
  }),
});

export const { useCurrencyMutation } = currencyApi;
