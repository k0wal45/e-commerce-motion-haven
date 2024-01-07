import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.response.timeAdded'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  }),
  reducer: {
    cart: cartReducer,
  },
})