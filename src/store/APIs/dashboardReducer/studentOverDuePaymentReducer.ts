import { createSlice } from '@reduxjs/toolkit'

import { StudentOverDuePaymentList } from '../Api'

const initialState: any = {}

const StudentOverDuePaymentListReducer: any = createSlice({
  name: 'StudentOverDue',
  initialState,
  reducers: {
    StudentUpcomingPayment(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [StudentOverDuePaymentList.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [StudentOverDuePaymentList.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [StudentOverDuePaymentList.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { StudentOverDue } = StudentOverDuePaymentListReducer.actions

export default StudentOverDuePaymentListReducer.reducer
