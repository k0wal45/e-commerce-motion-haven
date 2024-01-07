import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, product) => {
      state.value.push(product.payload)
    },
    getCartItems: () => {
      
    },
    setLocalStorage: () => {

    }

  },
})

export const { addToCart, getCartItems, setLocalStorage } = cartSlice.actions

export default cartSlice.reducer