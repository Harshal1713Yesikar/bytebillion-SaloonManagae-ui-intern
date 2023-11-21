import { createSlice } from '@reduxjs/toolkit'

import { chartApiData } from '../Api'

const initialState: any = { value: 1 }

const feeReceiptDesignReducer: any = createSlice({
  name: 'fee receipt design',
  initialState,
  reducers: {
    feeSlipDesign(state: any, action: any) {
      state.value = action.payload
    }
  }
})

export const { feeSlipDesign } = feeReceiptDesignReducer.actions

export default feeReceiptDesignReducer.reducer
