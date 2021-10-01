import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../../app/store';
import { fetchData } from "./orderAPI";

// Thunk to grab orderData
export const fetchOrderData = createAsyncThunk(
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
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.orders.concat(action.payload)
    })
  }
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;