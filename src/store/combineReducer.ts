import allInventoryListReducer from './APIs/inventoryReducer/allInventoryListReducer'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import chartApiReducer from './APIs/dashboardReducer/chartApiReducer'
import receivedPaymentApiReducer from './APIs/dashboardReducer/receivedPaymentApiReducer'
import getAllStudentCountReducer from './APIs/dashboardReducer/getAllStudentCountReducer'
import EmployeeInHandSalaryReducer from './APIs/dashboardReducer/EmployeeInHandSalaryReducer'
import getAllEmployeeCountReducer from './APIs/dashboardReducer/getAllEmployeeCountReducer'
import StudentUpComingPaymentReducer from './APIs/dashboardReducer/StudentUpComingPaymentReducer'
import studentOverDuePaymentReducer from './APIs/dashboardReducer/studentOverDuePaymentReducer'
import paySlipReducer from './APIs/designSelectionReducer/paySlipReducer'
import feeReceiptReducer from './APIs/designSelectionReducer/feeReceiptReducer'

// employee Reducer
import employeeRegistrationReducer from './APIs/employeeReducer/employeeRegistrationReducer'

const reducer: any = {
  allInventoryList: allInventoryListReducer,

  chartApiReducer: chartApiReducer,
  receivedPaymentApiReducer: receivedPaymentApiReducer,
  getAllStudentCountReducer: getAllStudentCountReducer,
  getAllEmployeeCountReducer: getAllEmployeeCountReducer,
  EmployeeInHandSalaryReducer: EmployeeInHandSalaryReducer,
  StudentUpComingPaymentReducer: StudentUpComingPaymentReducer,
  studentOverDuePaymentReducer: StudentUpComingPaymentReducer,
  employeeRegistrationReducer: employeeRegistrationReducer,
  feeReceiptDesignReducer: feeReceiptReducer,
  paySlipDesignReducer: paySlipReducer
}

export const store: any = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

//   export type  AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
