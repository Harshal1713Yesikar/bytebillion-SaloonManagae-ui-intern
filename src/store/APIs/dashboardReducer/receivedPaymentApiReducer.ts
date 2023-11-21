import { createSlice } from '@reduxjs/toolkit'

import { receivedPaymentApi } from '../Api'

const initialState: any = {}

const receivedPaymentApiReducer: any = createSlice({
  name: 'ChartData',
  initialState,
  reducers: {
    ChartData(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [receivedPaymentApi.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [receivedPaymentApi.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [receivedPaymentApi.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { ChartData } = receivedPaymentApiReducer.actions

export default receivedPaymentApiReducer.reducer
