import {  createSlice } from "@reduxjs/toolkit";


import { employeeRegistartionApi } from "../Api";

const initialState:any = {};

const employeeRegistrationReducer:any = createSlice({
  name: "employeeRegistration",
  initialState,
  reducers: {
    employeeRegistrationData(state:any, action:any) {
      state = action.data;
    },
  },
  extraReducers: {
    [employeeRegistartionApi.fulfilled]: (state:any, action:any) => {
      // console.log(action.payload.data);
      state.mssg = "success";
      state.payload = action.payload;
    },
    [employeeRegistartionApi.pending]: (state:any, action:any) => {
      state.mssg = "loading";
    },
    [employeeRegistartionApi.rejected]: (state:any, action:any) => {
      state.mssg = "rejected";
    },
  },
});

export const { employeeRegistrationData } = employeeRegistrationReducer.actions;

export default employeeRegistrationReducer.reducer;
