import { createSlice } from '@reduxjs/toolkit'
import { PayMentsProps } from 'types/types'

const initialState = {
  paymentInfo: {} as PayMentsProps,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayMentInfo(state, action) {
      state.paymentInfo = action.payload
    },
  },
})

export const { setPayMentInfo } = paymentSlice.actions
export default paymentSlice.reducer
