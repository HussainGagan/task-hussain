import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";
const initialState = {
  loading: false,
  series: null,
  error: "",
};

export const fetchAsyncSeries = createAsyncThunk(
  "movies/fetchAsyncSeries",
  async () => {
    const seriesText = "Friends";
    const res = await movieApi.get(
      `?apikey=${APIKey}&s=${seriesText}&type=series`
    );
    return res.data;
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.series = payload;
        state.error = "";
      })
      .addCase(fetchAsyncSeries.rejected, (state, action) => {
        state.loading = false;
        state.series = {};
        state.error = action.error.message;
      });
  },
});

export const getSeriesData = (state) => state.series;
export default seriesSlice.reducer;
