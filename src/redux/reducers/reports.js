import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const getReports = createAsyncThunk(
  "reports/getReports",
  async ({ endDate, startDate, id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/reports/test?endDate=${endDate}&startDate=${startDate}&id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;

      return rejectWithValue(data?.msg);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const reportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.reports = {};
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: {
    [getReports.pending]: (state) => {
      state.isFetching = true;
    },
    [getReports.fulfilled]: (state, { payload }) => {
      state.reports = payload.Result;
      state.isFetching = false;
    },

    [getReports.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const reportsSelector = (state) => state.reports;
export const { clearState } = reportSlice.actions;
export default reportSlice.reducer;
