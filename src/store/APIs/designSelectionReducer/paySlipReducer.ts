import { createSlice } from '@reduxjs/toolkit'

import { chartApiData } from '../Api'

const initialState: any = { value: 1 }

const paySlipDesignReducer: any = createSlice({
  name: 'pay slip design',
  initialState,
  reducers: {
    paySlipDesign(state: any, action: any) {
      state.value = action.payload
    }
  }
})

export const { paySlipDesign } = paySlipDesignReducer.actions

export default paySlipDesignReducer.reducer
