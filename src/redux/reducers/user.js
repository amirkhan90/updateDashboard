import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
    logout: (state) => {
      return {
        user: "",
        token: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
      };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      payload.user.role === "ADMIN" && localStorage.setItem("token", payload.token);
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = "only admin can logged in";
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "Invalid Email or Password";
    },
  },
});
export const { clearState, logout } = userSlice.actions;
export const userSelector = (state) => state.user;

export default userSlice.reducer;
