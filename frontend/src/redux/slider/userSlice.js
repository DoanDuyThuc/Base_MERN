import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    resetUserLogout: (state) => {
      state.name = '';
      state.email = '';
      state.accessToken = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUserLogin ,resetUserLogout} = userSlice.actions

export default userSlice.reducer