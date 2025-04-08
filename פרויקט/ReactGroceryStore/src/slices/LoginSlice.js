import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginManager,loginSupplier } from '../service/LoginService'



export const login = createAsyncThunk("user/login",
  async (newUser, { rejectWithValue }) => {
    try {
      const UserData = await loginManager(newUser);
      return UserData.data; 
    } catch (error) {
      return rejectWithValue(error);
    }

  });

  export const login2 = createAsyncThunk("user/login2",
  async (newUser, { rejectWithValue }) => {
    try {
      const UserData = await loginSupplier(newUser);
      return UserData.data;
    } catch (error) {
      return rejectWithValue(error);
    }

  });

  
const initialState = {
  user: {}, 
  loading: false,
  error: null
}
export const LoginSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message; 
      })

      .addCase(login2.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login2.rejected, (state, action) => {
        state.error = action.error.message; 
      })
     
     
     
  }
})

export default LoginSlice.reducer

