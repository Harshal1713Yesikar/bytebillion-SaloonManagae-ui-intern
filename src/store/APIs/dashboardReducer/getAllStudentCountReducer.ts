import { createSlice } from '@reduxjs/toolkit'

import { getAllStudentCount } from '../Api'

const initialState: any = {}

const getAllStudentCountReducer: any = createSlice({
  name: 'studentCount',
  initialState,
  reducers: {
    studentCount(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [getAllStudentCount.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [getAllStudentCount.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [getAllStudentCount.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { studentCount } = getAllStudentCountReducer.actions

export default getAllStudentCountReducer.reducer
