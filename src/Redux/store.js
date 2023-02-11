/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import { currencyApi } from "./services/currencyApi";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import currencyReducer from "./slice/currencySlice";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [""],
};

const combinedReducer = combineReducers({
  [currencyApi.reducerPath]: currencyApi.reducer,
  currencyState: currencyReducer,
});
export const rootReducers = (state, action) => {
  return combinedReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(currencyApi.middleware),
});
setupListeners(store.dispatch);
let persistor = persistStore(store);
export { store, persistor };
