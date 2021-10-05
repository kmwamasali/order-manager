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
  order: any,
  loading: string
}

const initialState: InitialState = {
  orders: [],
  order: {},
  loading: 'idle'
}

// Handle reducer actions
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrder: (state, action) => {
      state.order = state.orders.find(item => item.id === action.payload)
    },
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

export const { getOrder, add, sort } = ordersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrder = (state: RootState) => state.orders.order;

export default ordersSlice.reducer;