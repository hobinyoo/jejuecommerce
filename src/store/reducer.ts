import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import paymentSlice from './features/paymentSlice'
import windowSizeSlice from './features/windowSizeSlice'

const combinedReducer = combineReducers({
  payment: paymentSlice,
  windowSize: windowSizeSlice,
})

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}
export default rootReducer
