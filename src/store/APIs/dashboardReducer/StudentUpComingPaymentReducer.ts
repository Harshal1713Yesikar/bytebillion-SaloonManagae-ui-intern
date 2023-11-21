import { createSlice } from '@reduxjs/toolkit'

import { StudentUpcomingPaymentList } from '../Api'

const initialState: any = {}

const StudentUpComingPaymentReducer: any = createSlice({
  name: 'employeeInHandSalary',
  initialState,
  reducers: {
    StudentUpcomingPayment(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [StudentUpcomingPaymentList.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [StudentUpcomingPaymentList.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [StudentUpcomingPaymentList.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { employeeInHandSalary } = StudentUpComingPaymentReducer.actions

export default StudentUpComingPaymentReducer.reducer
