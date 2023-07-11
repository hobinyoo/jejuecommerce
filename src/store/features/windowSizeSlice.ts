import { createSlice } from '@reduxjs/toolkit'
import { PayMentsProps } from 'types/types'

interface WindowProps {
  width: number
  height: number
}

const initialState = {
  windowSize: { width: 0, height: 0 } as WindowProps,
}

export const windowSizeSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setWindowSize(state, action) {
      state.windowSize = action.payload
    },
  },
})

export const { setWindowSize } = windowSizeSlice.actions
export default windowSizeSlice.reducer
