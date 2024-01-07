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

          console.log(currentObject.id)
          console.log(cartItems)

          const updatedObject = (array) => {
            return array.map((obj) => (obj.id === currentObject.id ? { ...obj, quantity: obj.quantity + product.payload.quantity } : obj));
          }

          const updatedArray = updatedObject(cartItems);

          console.log(updatedArray)
          localStorage.clear()

          const setItemToLocalStorage = (object) => {
            const jsonObject = JSON.stringify(object);
            return jsonObject
          }

          updatedArray.map((curProd) => (localStorage.setItem(curProd.id, setItemToLocalStorage(curProd))))

          return
          
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