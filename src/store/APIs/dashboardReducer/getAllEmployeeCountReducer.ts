import { createSlice } from '@reduxjs/toolkit'

import { getAllEmployeeCount } from '../Api'

const initialState: any = {}

const getAllEmployeeCountReducer: any = createSlice({
  name: 'employeeCount',
  initialState,
  reducers: {
    employeeCount(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [getAllEmployeeCount.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [getAllEmployeeCount.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [getAllEmployeeCount.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { studentCount } = getAllEmployeeCountReducer.actions

export default getAllEmployeeCountReducer.reducer
