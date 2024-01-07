import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, product) => {

      const items = { ...localStorage };

      const cartItems = []

      for (const [key, value] of Object.entries(items)) {

        const parsed = JSON.parse(value)
        cartItems.push(parsed)
      }

      for(let i = 0; i < cartItems.length; i++) {
        const currentObject = cartItems[i];
        
        if (currentObject.id === product.payload.id) {
          
        }
      }

        const json = JSON.stringify(product.payload);
        localStorage.setItem(product.payload.id, json);

    
    },
    getCartItems: (state) => {
      const items = { ...localStorage };

      const cartItems = []

      for (const [key, value] of Object.entries(items)) {

        const parsed = JSON.parse(value)
        cartItems.push(parsed)
      }

      // console.log(cartItems)
      state.value = cartItems

    }, 
    deleteCartItem: (state, product) => {
      localStorage.removeItem(product.payload.id)
    }, 

  },
})

export const { addToCart, getCartItems, deleteCartItem } = cartSlice.actions

export default cartSlice.reducer