import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllSuppliers, getSupplier, signupSupplier, addProduct } from '../service/SupplierService'



export const AllSuppliers = createAsyncThunk("/AllSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hiiii");
      const response = await getAllSuppliers(); 
      console.log(response.data)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  })


  export const getsupplier = createAsyncThunk(
    'id/getsupplier',
    async ({ id }) => {
      const response = await getSupplier(id); 
      return response.data;
    }
  )

  export const addsuplier = createAsyncThunk(
    'supplier/addsuplier',
    async (newsupplier) => {
      const response = await signupSupplier(newsupplier)
      return response.data;
    }
  )

  export const addproduct = createAsyncThunk(
    'newproduct/addproduct',
    async (newproduct) => {
      const response = await addProduct(newproduct)
      return response.data;
    }
  )

const initialState = {
    suppliers: [],
    supplier:{},
    product:{},
    loading: false,
    error: null
  }
  
  export const SuppliersSlice = createSlice({
    name: 'Supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      
      .addCase(AllSuppliers.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(AllSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getsupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.supplier = action.payload;
      })
      .addCase(getsupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getsupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(addsuplier.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.supplier = action.payload;
      })
      .addCase(addsuplier.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(addsuplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(addproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
  });

  export default SuppliersSlice.reducer;
  

