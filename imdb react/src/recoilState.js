import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null,
});

export const configUrlState = atom({
  key: "configUrl",
  default: null,
});

export const watchListState = atom({
  key: "watchlist",
  default: [],
});
