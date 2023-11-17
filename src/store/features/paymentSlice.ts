import { createSlice } from '@reduxjs/toolkit'
import { OrderProps, PayMentsProps } from 'types/types'

const initialState = {
  paymentInfo: {} as PayMentsProps,
  ordersInfo: [] as OrderProps[],
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayMentInfo(state, action) {
      state.paymentInfo = action.payload
    },
    setOrdersInfo(state, action) {
      state.ordersInfo = action.payload
    },
  },
})

export const { setPayMentInfo, setOrdersInfo } = paymentSlice.actions
export default paymentSlice.reducer
