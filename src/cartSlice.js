import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },

  },
})

// Action creators are generated for each case reducer function
export const { increment } = cartSlice.actions

export default cartSlice.reducer