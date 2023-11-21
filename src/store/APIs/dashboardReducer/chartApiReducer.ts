import { createSlice } from '@reduxjs/toolkit'

import { chartApiData } from '../Api'

const initialState: any = {}

const chartApiDataReducer: any = createSlice({
  name: 'ChartData',
  initialState,
  reducers: {
    ChartData(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [chartApiData.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [chartApiData.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [chartApiData.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { ChartData } = chartApiDataReducer.actions

export default chartApiDataReducer.reducer
