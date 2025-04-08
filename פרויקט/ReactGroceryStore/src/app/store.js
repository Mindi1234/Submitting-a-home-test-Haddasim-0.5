import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/LoginSlice';
import managerReducer from "../slices/ManagerSlice"
import suppliersReducer from '../slices/SuppliersSlice';
import orderReducer from '../slices/OrderSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    manager:managerReducer,
    supplier: suppliersReducer,
    order: orderReducer,
  },
});

