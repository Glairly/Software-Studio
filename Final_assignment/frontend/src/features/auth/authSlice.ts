import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export enum role {
  ADMIN,
  CLIENT
}

export interface User {
  id : Number,
  name : String,
  username : String,
  password : String,
  role : role,
  point : Number,
}

export interface AuthState {
  value: User;
 
}

const initialState: AuthState = {
  value: {
    id : 0,
    name : "",
    username : "",
    password : "",
    role : role.CLIENT,
    point : 0,
  }
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      console.log("asdasd")
      state.value = initialState.value;
    },
  },

});

export const { setUser, removeUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.value;


export default authSlice.reducer;
