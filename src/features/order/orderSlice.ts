import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { fetchData } from "./orderAPI";

// Thunk to grab orderData
export const fetchOrderData = createAsyncThunk(
  'orders/fetchOrderData',
  async () => {
    const response = await fetchData();
    return response.data;
  }
);

interface InitialState {
  orders: any[],
  loading: string
}

const initialState: InitialState = {
  orders: [],
  loading: 'idle'
}

// Handle reducer actions
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    add: (state, action) => {
      state.orders.push(action.payload)
    },
    sort: (state) => {
      state.orders.sort((a, b) => {
        if (a['type'] < b['type']) {
          return -1;
        }
        if (b['type'] > a['type']) {
          return 1;
        }

        return 0;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.orders = action.payload
    })
  }
});

export const { add, sort } = ordersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;