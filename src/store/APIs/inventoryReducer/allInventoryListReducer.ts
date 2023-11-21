 import {  createSlice } from "@reduxjs/toolkit";


import { allInventoryList } from "../Api";

const initialState:any = {};

const allInventoryListReducer:any = createSlice({
  name: "inventoryList",
  initialState,
  reducers: {
    listInventoryData(state:any, action:any) {
      state = action.data;
    },
  },
  extraReducers: {
    [allInventoryList.fulfilled]: (state:any, action:any) => {
      // console.log(action.payload.data);
      state.mssg = "success";
      state.payload = action.payload;
    },
    [allInventoryList.pending]: (state:any, action:any) => {
      state.mssg = "loading";
    },
    [allInventoryList.rejected]: (state:any, action:any) => {
      state.mssg = "rejected";
    },
  },
});

export const { listInventoryData } = allInventoryListReducer.actions;

export default allInventoryListReducer.reducer;
