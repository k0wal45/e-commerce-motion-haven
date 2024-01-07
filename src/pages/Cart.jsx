import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {

  const getCart = useSelector((state) => state.cart.value)

  const [cart, setCart] = useState([])

  return (
    <main className='w-screen overflow-x-hidden'>
      cart
    </main>
  )
}

export default Cart
