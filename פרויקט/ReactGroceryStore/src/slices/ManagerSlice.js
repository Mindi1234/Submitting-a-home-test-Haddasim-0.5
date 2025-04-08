import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getAllOrders} from '../service/ManagerService'




export const AllOrders = createAsyncThunk(
  "user/AllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrders(); 
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const initialState = {
    orders: [], 
    loading: false,
    error: null
  }
  
  export const ManagerSlice = createSlice({
    name: 'Manager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(AllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(AllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    }
  });
  
  export default ManagerSlice.reducer;
  

