import { createSlice } from '@reduxjs/toolkit'

import { EmployeeInHandSalary } from '../Api'

const initialState: any = {}

const EmployeeInHandSalaryReducer: any = createSlice({
  name: 'employeeInHandSalary',
  initialState,
  reducers: {
    employeeCount(state: any, action: any) {
      state = action.data
    }
  },
  extraReducers: {
    [EmployeeInHandSalary.fulfilled]: (state: any, action: any) => {
      // console.log(action.payload.data);
      state.mssg = 'success'
      state.payload = action.payload
    },
    [EmployeeInHandSalary.pending]: (state: any, action: any) => {
      state.mssg = 'loading'
    },
    [EmployeeInHandSalary.rejected]: (state: any, action: any) => {
      state.mssg = 'rejected'
    }
  }
})

export const { employeeInHandSalary } = EmployeeInHandSalaryReducer.actions

export default EmployeeInHandSalaryReducer.reducer
