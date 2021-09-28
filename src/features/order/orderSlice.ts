import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./orderAPI";

// Thunk to grab orderData
const fetchOrderData = createAsyncThunk(
  'orders/fetchOrderData',
  async () => {
    const response = await fetchData();
    return response.data;
  }
);

// Handle reducer actions
export const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], loading: 'idle' },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.orders.concat(action.payload)
    })
  }
});