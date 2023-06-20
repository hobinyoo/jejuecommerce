import { createSlice } from '@reduxjs/toolkit'
import { PayMentProps } from 'types/types'

const initialState = {
  paymentInfo: {} as PayMentProps,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayMentInfo(state, action) {
      console.log(action.payload, '하이')
      state.paymentInfo = action.payload
    },
  },
})

export const { setPayMentInfo } = paymentSlice.actions
export default paymentSlice.reducer
