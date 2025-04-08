import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSupplierProducts, AddOrder, getAllProducts, getOrdersBySupplier, ChangeStatusOrder} from '../service/OrderService'



  export const SupplierProducts =createAsyncThunk("userId/SupplierProducts",
  async ({id},{rejectWithValue}) => {
    console.log("SupplierId",id);
    try{
      const monthData= await getSupplierProducts(id)
        return monthData;
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (neworder) => {
      const response = await AddOrder(neworder)
      return response.data;
    }
  )

  export const AllProducts = createAsyncThunk("/AllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts()
      console.log(response.data)
      return response;
    } catch (error) {
      return rejectWithValue(error)
    }
  })


export const OrdersSupplier =createAsyncThunk("userId/OrdersSupplier",
async ({id},{rejectWithValue}) => {
  console.log("SupplierId",id);
  try{
    const monthData= await getOrdersBySupplier(id)
      return monthData;
  }catch(error){
    return rejectWithValue(error);
  }
}
)


export const changeOrder = createAsyncThunk(
    'order/changeOrder',
    async (orderStatus) => {
      const response = await ChangeStatusOrder(orderStatus); // קריאה ל-API
      return response.data;
    }
  )

const initialState = {
    products: [],
    orders: [],
    order:{},
    loading: false,
    error: null
  }
  
  export const OrderSlice = createSlice({
    name: 'Orcer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      
      .addCase(SupplierProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(SupplierProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(SupplierProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(AllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(AllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(OrdersSupplier.pending, (state) => {
        state.loading = true;
      })
      .addCase(OrdersSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(OrdersSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(changeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(changeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
  });

  export default OrderSlice.reducer;
  

