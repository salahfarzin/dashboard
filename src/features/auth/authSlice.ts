import { createSlice } from "@reduxjs/toolkit"

import { userLogin } from "./authActions";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

export type AuthState = {
  loading: boolean;
  userInfo: object | null;
  error: string | null;
  userToken: string | null;
}

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  error: null,
  userToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.access_token
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
      })
  }
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer