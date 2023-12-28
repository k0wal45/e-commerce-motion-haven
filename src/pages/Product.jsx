import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

  const { prodId } = useParams()

  return (
    <div>
      {prodId}
    </div>
  )
}

export default Product
